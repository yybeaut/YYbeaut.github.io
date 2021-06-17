/**
 * components文件夹添加一个叫global.js的文件，在这个文件里借助webpack动态将需要的基础组件统统打包进来。
 * 最后我们在main.js中import 'components/global.js'，然后我们就可以随时随地使用这些基础组件，无需手动引入了。
 * main.js
 * import  './components/global.js'
 */

import Vue from 'vue'
// 首字母转大写
function capitalizeFirstLetter(string) {

    return string.charAt(0).toUpperCase() + string.slice(1)

}
const requireComponent = require.context(

    '.', false, /\.vue$/

    //找到components文件夹下以.vue命名的文件

)

// console.log(requireComponent.keys(), 'requireComponent');

requireComponent.keys().forEach(fileName => {

    const componentConfig = requireComponent(fileName)

    const componentName = capitalizeFirstLetter(

        fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')

        //因为得到的filename格式是: './baseButton.vue', 所以这里我们去掉头和尾，只保留真正的文件名

    )

    Vue.component(componentName, componentConfig.default || componentConfig)

})