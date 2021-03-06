/*
* Copyright (c) 2012-2017 "JUSPAY Technologies"
* JUSPAY Technologies Pvt. Ltd. [https://www.juspay.in]
*
* This file is part of JUSPAY Platform.
*
* JUSPAY Platform is free software: you can redistribute it and/or modify
* it for only educational purposes under the terms of the GNU Affero General
* Public License (GNU AGPL) as published by the Free Software Foundation,
* either version 3 of the License, or (at your option) any later version.
* For Enterprise/Commerical licenses, contact <info@juspay.in>.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  The end user will
* be liable for all damages without limitation, which is caused by the
* ABUSE of the LICENSED SOFTWARE and shall INDEMNIFY JUSPAY for such
* damages, claims, cost, including reasonable attorney fee claimed on Juspay.
* The end user has NO right to claim any indemnification based on its use
* of Licensed Software. See the GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with this program. If not, see <https://www.gnu.org/licenses/agpl.html>.
*/

Array.prototype.flatten = function() {
  return this.reduce(function(prev, cur) {
    var more = [].concat(cur).some(Array.isArray);
    return prev.concat(more ? cur.flatten() : cur);
  },[]);
};

var parseParams = require('../helpers/ios/parseParams');

module.exports = function(type, props, ...children){
	var paramType;

  children =  children.flatten();

  if (!props)
  props = {};

  if(typeof type === "string") {
    props =  parseParams(type, props, "set");

    props.node_id = window.__NODE_ID + '';
  	window.__NODE_ID++;

  	if (!props.__filename)
  	props.__filename = "filename not added";

    type = type[0].toUpperCase() + type.substr(1, type.length);

    return {type: type,  props: props, children: children};

  } else {
    return new type(props, children);
  }
};
