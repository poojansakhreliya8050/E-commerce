import React from 'react'

const SubCategorySlider = () => {
  return (
    <div>
        <div className="photo-wrapper" id="photoWrapper">
        <div className="photo" >
            <img src="https://source.unsplash.com/featured?cat"/>
        </div>
        <div className="photo">
            <img src="https://source.unsplash.com/featured??cat"/>
        </div>
        <div className="photo">
            <img src="https://source.unsplash.com/featured???cat"/>
        </div>
        <div className="photo">
            <img src="https://source.unsplash.com/featured????cat"/>
        </div>
        <div className="photo">
            <img src="https://source.unsplash.com/featured?????cat"/>
        </div>
        <div className="photo">
            <img src="https://source.unsplash.com/featured??????cat"/>
        </div>
    </div>
    </div>
  )
}

export default SubCategorySlider