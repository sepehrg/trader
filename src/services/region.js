import React, { useContext, useEffect, useState } from "react";
import SejamService from "../services/sejamService";

const getRegionTypes = async (state, dispatch) => {
  if (!state.regionTypes || state.regionTypes.length == 0) {
    let regionTypeList = [];
    await SejamService.getRegionTypes((status, data) => {
      regionTypeList = data.Result;
    });

    dispatch({
      type: "regionTypes",
      payload: regionTypeList,
    });
    return regionTypeList;
  } else {
    return state.regionTypes;
  }
};
// const getRegionData = async (parentId, regionTypeId) => {
//   var regionData=[]
//     return await SejamService.getRegionsByParentIdAndRegionType(

//         {
//             parentId,
//             regionTypeId
//         } , (status, data) => {
//             regionData=data.Result
//         });
// }

const getRegionByType = async (state, dispatch, parentId, regionType) => {
  var regionTypes = await getRegionTypes(state, dispatch);
  let regionData = [];
  if (regionTypes && regionTypes.length > 0) {
    var regionSelectedType = regionTypes.find(
      (item) => item.EnTitle == regionType.EnTitle
    );
    if (regionSelectedType) {
      var regionTypeId = regionSelectedType.Id;
      await SejamService.getRegionsByParentIdAndRegionType(
        {
          parentId,
          regionTypeId,
        },
        (status, data) => {
          regionData = data.Result;
          //console.log("regionTypes", regionData)
        }
      );
    }
  }
  return regionData;
};

export const getRegionById = async (regionId) => {
  return await SejamService.getRegionById(regionId, (status, data) => {});
};

export default getRegionByType;
