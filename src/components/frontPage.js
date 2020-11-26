import React from "react";
import img1 from "../assets/586.jpg"
import "../assets/css/frontPage.css"
const FrontPage=(props)=>{
	return(
		<>

		<div>
			<img className="image-banner" src={img1} alt="img"/>
      	</div>
      	<div className="content-front">
      	<h1 className="front-head">
      		SAY HELLO TO YOUR <span className="front-head-ch">SECOND HOME</span>
		</h1>
		<div className="front-para">
			A new city can sometimes feel too new, right?<br/>	 New people, new streets, even new languages.
 			In times like these, wouldn’t it be nice to have a place to stay that feels like home?
 			<br/>Your room will have all the furniture and facilities you need for a comfortable stay.
 			 Because your chair shouldn’t multitask as a clothes rack. And your bed is not meant to be a study table.
      	</div>
      	
      	</div>
      	</>
		);
}
export  default FrontPage;