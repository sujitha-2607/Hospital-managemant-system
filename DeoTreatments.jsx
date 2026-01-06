import React from 'react'
import Header from './HeaderDeo'
import GetApp from '../assets/GetApp'
import { GetTreatmentsRoute,UpdateTreatmentsRoute,DeleteTreatmentsRoute,CreateTreatmentsRoute } from '../APIRoutes/APIRoutes'
const DeoTreatments = () => {
  return (
    <div>
      <Header/>
      <GetApp GetRoute={GetTreatmentsRoute} UpdateRoute={UpdateTreatmentsRoute} DeleteRoute={DeleteTreatmentsRoute} CreateRoute={CreateTreatmentsRoute} msg={"Treatments"}/>


    </div>
  )
}

export default DeoTreatments
