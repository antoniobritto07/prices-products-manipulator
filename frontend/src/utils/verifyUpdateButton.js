const isInvalidOperation = (data) => {
    return (
        data.some((eachData) => (
            !eachData.code ||
            !eachData.newPrice ||
            ((parseFloat(eachData.newPrice)) < parseFloat(eachData.costPrice)) ||
            (parseFloat(eachData.newPrice) > parseFloat(eachData.previousPrice) * 1.1) ||
            (parseFloat(eachData.newPrice) < parseFloat(eachData.previousPrice) * 0.9)
        )
        ))
}

export { isInvalidOperation };