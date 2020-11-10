const {replace} = '';

const es = /&(?:amp|#038|lt|#60|gt|#62|apos|#39|quot|#34|#8211|#8212|#8216|#8217|#8220|#8221|#338|#339|#352|#353|#376|#710|#732|#8195|#8364);/g;

const unes = {
    '&amp;': '&',
    '&#038;': '&',
    '&lt;': '<',
    '&#60;': '<',
    '&gt;': '>',
    '&#62;': '>',
    '&apos;': "'",
    '&#39;': "'",
    '&quot;': '"',
    '&#34;': '"',
    "&#8211;": "-",
    "&#8212;": "--",
    "&#8216;": "‘",
    "&#8217;": "’",
    "&#8220;": '“',
    "&#8221;": '”',

    "&#338;": "Œ",
    "&#339;": "œ",
    "&#352;": "Š",
    "&#353;": "š",
    "&#376;": "Ÿ",
    "&#710;": "ˆ",
    "&#732;": "˜",
    "&#8195;": "  ",
    "&#8364;": "€"
  };

const cape = m => unes[m];

const unescape = un => replace.call(un, es, cape);

export default unescape;