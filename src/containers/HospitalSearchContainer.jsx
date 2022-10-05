// import { useDispatch, useSelector } from "react-redux";
// import HospitalSearch from "../routes/HospitalSearch";

// import { setMainArea, setSubArea } from "../modules/hospital";

// const HospitalSearchContainer = () => {
//   const dispatch = useDispatch();
//   const { mainArea, subArea, sidoCode, sgguCode } = useSelector(
//     ({ hospital }) => ({
//       mainArea: hospital.mainArea,
//       subArea: hospital.subArea,
//       sidoCode: hospital.sidoCode,
//       sgguCode: hospital.sgguCode,
//     })
//   );

//   const onChangeMain = (sido, sdCode) => {
//     console.log("메인");
//     dispatch(
//       setMainArea({
//         mainArea: sido,
//         sidoCode: sdCode,
//       })
//     );
//   };

//   const onChangeSub = (sggu, sgCode) => {
//     console.log("서브");
//     dispatch(
//       setSubArea({
//         subArea: sggu,
//         sgguCode: sgCode,
//       })
//     );
//   };

//   return <HospitalSearch />;
// };

// export default HospitalSearchContainer;
