import React from 'react'
import Header from './HeaderDeo'
import GetApp from '../assets/GetApp'
import { GetTestsRoute,UpdateTestsRoute,DeleteTestsRoute,CreateTestsRoute } from '../APIRoutes/APIRoutes'
const DeoTests = () => {
  return (
    <div>
      <Header/>
      <GetApp GetRoute={GetTestsRoute} UpdateRoute={UpdateTestsRoute} DeleteRoute={DeleteTestsRoute} CreateRoute={CreateTestsRoute} msg={"Tests"}/>


    </div>
  )
}

export default DeoTests
