import React from "react";

const ColorSelect = ({ colorData }) => {
  return (
    <div className={"color-select"}>
      <ul className={"d-flex text-center"}>
        <li>
          <label htmlFor="radio1">
            <input
              type="radio"
              name="color-img"
              id="radio1"
              defaultChecked
              value={colorData.variationColor1}
              className={"color-select__radio"}
            />
            {colorData.variationThumbnail1 ? (
              <img
                className={"color-select__img"}
                src={colorData.variationThumbnail1}
                alt={colorData.variationColor1 || "variation"}
              />
            ) : null}
            <p className={"color-select__name"}>{colorData.variationColor1}</p>
          </label>
        </li>
        <li className={"ps-5"}>
          <label htmlFor="radio2">
            <input
              type="radio"
              name="color-img"
              id="radio2"
              value={colorData.variationColor2}
              className={"color-select__radio"}
            />
            {colorData.variationThumbnail2 ? (
              <img
                className={"color-select__img"}
                src={colorData.variationThumbnail2}
                alt={colorData.variationColor2 || "variation"}
              />
            ) : null}
            <p className={"color-select__name"}>{colorData.variationColor2}</p>
          </label>
        </li>
      </ul>
    </div>
  );
};

export default ColorSelect;
