import React from "react";

export default function IconBoxStyle8({ title, subTitle, iconUrl, index }) {
  return (
    <div className="cs_iconbox cs_style_8 text-center cs_radius_20">
      <h2
        className={`cs_iconbox_title cs_semibold cs_fs_32 ${
          index > 0 ? "d-none" : ""
        }`}
      >
        {title}
      </h2>
      <p className="cs_iconbox_subtitle m-0">{subTitle}</p>
    </div>
  );
}
