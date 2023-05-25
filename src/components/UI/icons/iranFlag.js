import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const IranFlag = (props) => {
  return (
    <SvgIcon viewBox="0 0 766 512" {...props}>
      <g>
	<rect width="766" height="512" style={{fill:"#F0F0F0"}}/>
	<rect width="766" height="171" style={{fill:"#2B9E14"}}/>
	<rect y="341" width="766" height="171" style={{fill:"#C90022"}}/>
	<path style={{fill:"#C90022"}} d="M449.3,203h-26.7c0.2,3,0.3,5.7,0.3,8.7c0,19.8-4.6,38.9-13.2,52.6
		c-2.7,4.2-7.8,10.1-12.8,14.1V203h-28v75.3c-5-4-10.1-10-12.8-14.2c-8.6-13.7-13.4-32.7-13.4-52.5c0-3,0.3-5.7,0.5-8.7h-26.7
		c-0.2,3-0.3,5.7-0.3,8.7c0,54.9,29.3,97.8,66.6,97.8s66.6-42.9,66.6-97.8C449.6,208.7,449.5,206,449.3,203L449.3,203z"/>
	<path style={{fill:"#F0F0F0"}} d="M67,363h33v-38H67V363z M733,185h33v-36h-33V185z M666,185h33v-36h-33V185z M599,185h33v-36
		h-33V185z M533,185h33v-36h-33V185z M466,185h34v-36h-34V185z M399,185h34v-36h-34V185z M333,185h34v-36h-34V185z M266,185h34v-36
		h-34V185z M200,185h33v-36h-33V185z M134,185h33v-36h-33V185z M0,185h33v-36H0V185z M67,185h33v-36H67V185z M733,363h33v-38h-33
		V363z M666,363h33v-38h-33V363z M599,363h33v-38h-33V363z M533,363h33v-38h-33V363z M466,363h34v-38h-34V363z M399,363h34v-38h-34
		V363z M333,363h34v-38h-34V363z M266,363h34v-38h-34V363z M200,363h33v-38h-33V363z M134,363h33v-38h-33V363z M0,363h33v-38H0V363z
		"/>
</g>
    </SvgIcon>
  );
};

export default React.memo(IranFlag);
