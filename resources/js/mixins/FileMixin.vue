<script>
export default {
    methods: {
        forceFileDownload(response){
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'file2.png') //or any other extension
          document.body.appendChild(link)
          link.click()
        },

        downloadWithAxios(){
          axios({
            method: 'get',
            url: 'http://project.local/images/screenshot.png',
            responseType: 'arraybuffer'
          })
          .then(response => {
            this.forceFileDownload(response)
          })
          .catch(() => console.log('error occured'))
        }
    }
}
</script>
