import React, { Component } from 'react';
import ListElement from '../ListElement/ListElement';
import util from "../../utils/GeneralUtil";
import styles from "./Features.css";

// I am under the impression that the json returning is always correct
// and 3 levels deep per the design I made.

// I also restrict the nesting to three levels
// Cons
// 1) Data not displayed for more than 3 levels
// 2)

// Pros
// 1) does not break the design
// 2)
class Features extends Component {
  NESTED_LEVEL = 3;

  createFeaturesList = (feature, keyCount = 0, nestedSubFeatureCount = 0) => {
    if (nestedSubFeatureCount >= this.NESTED_LEVEL) { return; }

    return feature.map((item) => {
      let nextCount = keyCount + 1;
      const {title, presence, subfeatures} = item;
      const titleClassName = util.convertToStyleName(title);
      const isAvailableClassName = util.isAvailableStyleName(presence);
      if (subfeatures.length === 0) {
        let oldKey = keyCount;
        keyCount += 1;
        return (
          <ListElement
            key={oldKey}
            titleClassName={titleClassName}
            isAvailableClassName={isAvailableClassName}
            title={title}
          />
        )
      } else {
        let childEl = this.createFeaturesList(subfeatures, nextCount, nestedSubFeatureCount+1);
        let el = <ListElement
          key={keyCount}
          titleClassName={titleClassName}
          isAvailableClassName={isAvailableClassName}
          title={title}
          children= {<ul className={"features__sub-list"}>{childEl}</ul>}
        />;
        keyCount += childEl.length + 1;
        return el;
      }
    });
  };

  render() {
    return this.createFeaturesList(this.props.data)
  }
}

export default Features