import React from 'react';
// import MediaCard from './MediaCard'
import './SelectableCard.scss';
import AddIcon from '../../images/add-stop-icon.png';
import PlaceholderThumbnail from '../../images/placeholder-thumbnail.png';


class Card extends React.Component {
    render() {
      var isSelected = this.props.selected ? "selected" : "";
      var className = "card " + isSelected;
      return (
      <div className={className}>
        {this.props.children}
        <div className="middle"><img src={AddIcon} /></div>
      </div>)
    }
  }

//one single selectable stop card
class SelectableCard extends React.Component {

    render() {
      
      return (
        <Card selected={this.props.selected}>
          <div className="selectable" onClick={this.props.onClick}>
            {this.props.children}
          </div>
        </Card>
      );
    }
  }

class StopCard extends React.Component {

    render() {
      var {
        medium_url,
        thumbnailUrl,
        name,
        selected
      } = this.props;


      return (
        <SelectableCard
          selected={selected}>
          <div className="stop-card-selectable" onClick={this.props.onClick}>
            <img className="stop-card-image" alt='stop-card-thumbnail' src={medium_url == false ? PlaceholderThumbnail : medium_url} style={{'width':"100%"}} />
            <div className="stop-card-name" style={{height:'50px', textOverflow:'ellipsis'}}>{name}</div>
          </div>
        </SelectableCard>
      );
    }
  }


export default StopCard;