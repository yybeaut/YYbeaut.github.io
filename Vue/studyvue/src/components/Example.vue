<template>
    <div>
        <childcom :name="name" :age="age" :sex="sex" @testChangeName="changeName"></childcom>
    </div>
</template>

<script>
/**
 * inheritAttrs: false
 * this.$attrs
 * this.$listeners
 */
export default {
  name: 'test',
  props: [],
  data () {
    return {
      'name': '张三',
      'age': '30',
      'sex': '男'
    }
  },
  components: {
    'childcom': {
      props: ['name'],

      template:
      `<div>
          <div>我是子组件   {{name}}</div>
          <grandcom v-bind="$attrs" v-on="$listeners"></grandcom>
      </div>`,
      created () {
        console.log(this.$listeners, '////')
        console.log(this.$attrs, '////')
        // testChangeName(){}
      },
      components: {
        'grandcom': {
          template: `<div>我是孙子组件-------<button @click="grandChangeName">改变名字</button></div>`,
          created () {
            console.log('attr', this.$listeners)
          },
          methods: {
            grandChangeName () {
              this.$emit('testChangeName', 'kkkkkk')
            }
          }
        }
      }
    }
  },

  methods: {
    changeName (val) {
      this.name = val
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
