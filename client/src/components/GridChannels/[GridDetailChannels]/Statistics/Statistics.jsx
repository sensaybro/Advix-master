import React from 'react'
import eye from '../../../../assets/eye.svg'
import userIcon from '../../../../assets/person.svg'
import price from '../../../../assets/price.svg'
import priceCMP from '../../../../assets/priceCPM.svg'
import style from './Statistics.module.scss'
const Statistics = ({ data }) => {
	const ConvertIntToRUNumberFormat = among => {
		return new Intl.NumberFormat('ru', { style: 'decimal' }).format(among)
	}
	const ConvertIntToRUPercent = among => {
		return new Intl.NumberFormat('ru', { style: 'percent' }).format(among)
	}

	return (
		<div className={style.wrapperStatisticss}>
			{' '}
			<div className={style.wrapperStatistics}>
				<div className={style.pairStatistics}>
					<div className={style.wrapperOneStatistics}>
						<div>
							<img
								className={style.imageWrapper}
								width={15}
								height={15}
								src={userIcon}
								alt=''
							/>
						</div>
						<span>
							<strong>
								{ConvertIntToRUNumberFormat(data.count_subscribers)}{' '}
							</strong>
							подписчиков
						</span>
					</div>
					<div>
						<img
							className={style.imageWrapper}
							width={15}
							height={15}
							src={eye}
							alt=''
						/>
						<span>
							<strong>{ConvertIntToRUNumberFormat(data.count_views)}</strong>{' '}
							просмотров на пост
						</span>
					</div>
				</div>
				<div className={style.pairStatistics}>
					<div>
						<img
							className={style.imageWrapper}
							width={15}
							height={15}
							src={priceCMP}
							alt=''
						/>
						<span>
							<strong>{ConvertIntToRUNumberFormat(data.CPM)}</strong> CPM
						</span>
					</div>
					<div>
						<img
							className={style.imageWrapper}
							width={15}
							height={15}
							src={price}
							alt=''
						/>
						<span>
							<strong>{ConvertIntToRUPercent(data.ERR)}</strong> ERR
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Statistics
