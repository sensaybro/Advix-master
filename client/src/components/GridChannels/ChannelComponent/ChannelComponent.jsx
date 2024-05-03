import React from 'react'
import style from './ChannelComponent.module.scss'

const ChannelComponent = ({ data }) => {
	return (
		<div className={style.wrapperChannelComponent}>
			{data.map(element => {
				return (
					<div>
						<div>
							<img src={element.url_Image_Channel} alt='' srcset='' />
						</div>
						<div>
							<img src={element.url_Image_Channel} alt='' srcset='' />
							<div>
								<h2>{element.name_channel}</h2>
								<div>
									<span>{element.Category}</span>
									<span>#{element.position}</span>
								</div>
							</div>
						</div>
						<div>
							<span>{element.desc_channel}</span>
						</div>
						<div>
							<div>
								<img src='' alt='' />
								<span>{element.count_subscribers}</span>
							</div>
							<div>
								<img src='' alt='' />
								<span>{element.count_views}</span>
							</div>
							<div>
								<img src='' alt='' />
								<span>{element.CPM}CPM</span>
							</div>
							<div>
								<img src='' alt='' />
								<span>{element.ERR}% ERR</span>
							</div>
						</div>
						<div></div>
						<div>
							{element.hot_price !== 0 && <span>{element.hot_price}</span>}
							{element.hot_price === 0 ? element.price : element.hot_price}
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default ChannelComponent
