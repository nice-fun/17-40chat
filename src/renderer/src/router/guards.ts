

export const beforeEach =(to, from, next) => {
    console.log('beforeEach')
    console.log(to.path)
    next()
}

export const afterEach =(to, from, next) => {
    console.log('afterEach')
}