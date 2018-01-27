import 'babel-polyfill'
import './app'

process.on('unhandledRejection', (rea, p) => console.log(rea, p))
