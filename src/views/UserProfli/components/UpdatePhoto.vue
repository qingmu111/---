<template>
  <div class="update-photo">
    <img :src="img" alt="" class="img" ref="img" />
    <div class="toobar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { editUserPhoto } from '@/api/user'
export default {
  name: 'UpdatePhoto',
  data () {
    return {
      cropper: null

    }
  },
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
      crop (event) {
        console.log(event.detail.x)
        console.log(event.detail.y)
        console.log(event.detail.width)
        console.log(event.detail.height)
        console.log(event.detail.rotate)
        console.log(event.detail.scaleX)
        console.log(event.detail.scaleY)
      }
    })
  },
  methods: {
    /*   onConfirm () {
        this.cropper.getCroppedCanvas().toBlob(async (blob) => {
          console.log(blob)
          const formData = new FormData()

          formData.append('photo', blob)
          console.log(formData)
          const { data } = await editUserPhoto(formData)
          console.log(data)
        })
      } */
    onConfirm () {
      // console.log(this.cropper.getData())
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        console.log(blob)
        const formData = new FormData()

        // Pass the image file name as the third parameter if necessary.
        formData.append('photo', blob/*, 'example.png' */)
        console.log(formData)
        const { data } = await editUserPhoto(formData)
        console.log(data)

        this.$emit('close')
        this.$emit('updataPhoto', data.data.photo)
      })
    }

  }

}
</script>

<style lang="less" scoped>
.update-photo {
  background-color: #000;
  height: 100%;
}
.img {
  max-width: 100%;
  display: block;
}
.toobar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  .cancel,
  .confirm {
    width: 90px;
    height: 90px;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
}
</style>
