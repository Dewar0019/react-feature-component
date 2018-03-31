import React, { Component } from 'react';
import ListItem from './ListItem/ListItem';
import util from "../../utils/ClassStringUtils";
import "./Features.css";

const JSON_LEVEL_MAPPINGS = {
  0: "main-feature",
  1: "sub-feature",
  2: "detail-feature"
};

class Features extends Component {
  constructor(props){
    super(props);
    Features.prioritizeAvailableFeatures(this.props.data || []);
  }

  // Sort and order top level data
  static prioritizeAvailableFeatures(inputData) {
    inputData.sort((a, b) => b.presence - a.presence);
  }

  static determineStyleClasses(title, presence, levelIdentifier) {
    return {
      iconClassName: util.convertToStyleName(title),
      isAvailableClassName: util.isAvailableStyleName(presence),
      levelIdentifierClassName: JSON_LEVEL_MAPPINGS[levelIdentifier]
    }
  }

  // Level order traversal of JSON Struture
  createFeaturesList = (feature, keyCount = 0, levelIdentifier = 0) => {
    if (levelIdentifier > 2) {return;} //Do not parse more than three levels deep
    return feature.map((item) => {
      let nextCount = keyCount + 1;

      const { title, presence, subfeatures } = item;
      const styles = Features.determineStyleClasses(title, presence, levelIdentifier);

      if (subfeatures.length === 0 || !presence) {
        let el  = <ListItem
          key={keyCount}
          classNameStyles = {styles}
          title={title}
          presence={presence}
        />;
        keyCount += 1;
        return el;
      } else {
        let childEl = this.createFeaturesList(subfeatures, nextCount, levelIdentifier + 1);

        if (childEl) {
          childEl = childEl.filter((subEl) => subEl.props.presence);
        }

        let el = <ListItem
          key={keyCount}
          classNameStyles = {styles}
          title={title}
          presence={presence}
          children={ childEl &&
          <ul className={"features__sub-list"}>
            {childEl}
          </ul>
          }
        />;
        keyCount += ((childEl || 0) && childEl.length) + 1;
        return el;
      }
    });
  };

  render() {
    return this.createFeaturesList(this.props.data || [])
  }
}

export default Features