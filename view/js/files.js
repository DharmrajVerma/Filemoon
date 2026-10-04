const toast = new Notyf({
    position: {x: 'center', y: 'top'}
})
axios.defaults.baseURL =SERVER
const toggleDrawer = () =>{
    const drawer= document.getElementById("drawer")
    const rightValue = drawer.style.right
    if(rightValue === "0px"){
        drawer.style.right = "-33.33%"
    }
    else{
        drawer.style.right = "0px"
    }

}
const uploadFile = async (e) =>{
   try{
        e.preventDefault()
        const progress = document.getElementById("progress")
        const form = e.target
        const formdata = new FormData(form)
        const options = {
            onUploadProgress: (e) => {
                const loaded = e.loaded
                const total = e.total
                console.log(total,loaded)
                const percentageValue = Math.floor((loaded*100)/total)
                progress.style.width=  percentageValue + '%'
                progress.innerHTML= percentageValue + '%'
            }
        }
        const{data} = await axios.post('/api/file', formdata, options)
        toast.success(`${data.file} has been uploaded`)
        progress.style.width=  0
        progress.innerHTML= ''
        
   }
  
    catch (err) {
        console.log(err)
    
   }
}