export const sortedPriceObjects = priceObjects => {
	console.log('priceObjects', priceObjects)

	// Фильтруем массив, оставляя только элементы, у которых свойство 'hot' равно false
	const filteredPriceObjects = priceObjects.filter(item => !item.hot)

	// Создаем копию отфильтрованного массива, чтобы избежать мутации оригинального массива
	const result = filteredPriceObjects.slice().sort((a, b) => {
		const specialCases = [0, 1, 2]
		const aIsSpecial = specialCases.includes(a.time)
		const bIsSpecial = specialCases.includes(b.time)

		if (aIsSpecial && bIsSpecial) return 0 // Оба специальные случаи, порядок не меняется
		if (aIsSpecial) return 1 // a должен быть в конце
		if (bIsSpecial) return -1 // b должен быть в конце

		return a.time - b.time // Обычная сортировка по возрастанию
	})

	console.log('sorted result', result)
	return result
}
