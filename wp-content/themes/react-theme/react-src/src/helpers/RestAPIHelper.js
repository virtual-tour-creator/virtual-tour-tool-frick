
function getTourContent(title, date, visibility, stops) {
    let str = "<ol>";
    if (stops)
        stops.map(stop => {
            const { id } = stop;
            str += "<li>";
            str += id.toString();
            str += "</li>"
        });
    str += "</ol>"

    str += "<h2>TourDate:";
    str += date;
    str += "</h2>";

    str += "<h2>Visibility:";
    str += visibility;
    str += "</h2>";

    return str;
}

export async function RestAPICreateTour(title, date, visibility, stops) {
    const data = {
      "title": title,
      "status": "publish",
      "content": getTourContent(title, date, visibility, stops)
    };

    const response = await fetch('/wp-json/wp/v2/tour/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': reactInit.nonce
        },
        body: JSON.stringify(data)
    });

    if(!response.ok) {
        console.log(response);
        return -1;
    }

    const tour = await response.json();
    return tour.id;
}

export async function RestAPIGetStopById(id, time, callback) {
    const response = await fetch('/wp-json/wp/v2/stop/' + id + '?timestamp=' + time);
    if(!response.ok) {
        console.log(response);
        return;
    }

    const stop = await response.json();
    callback(stop);
}

export async function RestAPIGetTourByAuthorId(author, time, callback) {
    const response = await fetch('/wp-json/wp/v2/tour/?author=' + author + '?timestamp=' + time);
    if(!response.ok) {
        console.log(response);
        return;
    }

    const tours = await response.json();
    callback(tours);
}
