import style from './InfoAboutPublic.module.scss'
const InfoAboutPublic = ({ type_public }) => {
	console.log(type_public)
	return (
		<div className={style.wrapperInfoAboutPublic}>
			{type_public ? (
				<span className={style.OpenLink}>
					у канала <span>публичная</span> ссылка
				</span>
			) : (
				<span className={style.PrivateLink}>
					у канала <span>приватная</span> ссылка
				</span>
			)}
		</div>
	)
}

export default InfoAboutPublic
