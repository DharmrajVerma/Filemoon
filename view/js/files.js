axios.defaults.baseURL =SERVER
window.onload = () => {
    fetchFiles()
}

const toast = new Notyf({
    position: {x: 'center', y: 'top'}
})



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
        const uploadButton = document.getElementById("upload-btn")
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
        uploadButton.disabled = true
        const{data} = await axios.post('/api/file', formdata, options)
        toast.success(`${data.filename} has been uploaded`)
        uploadButton.disabled = false
        progress.style.width=  0
        progress.innerHTML= ''
        form.reset()
        toggleDrawer()
        
   }
  
    catch (err) {
        toast.error(err.response ? err.response.data.message : err.message)
    
   }
}
const getSize = (size) => {
    const mb = (size/1000)/1000
    return mb.toFixed(1)
}

const fetchFiles = async () => {
    try{
        const {data} = await axios.get('/api/file')
        const table = document.getElementById("files-table")
        for(let file of data){
            console.log(file)
            const ui = `
            <tr class="text-gray-500 border-b border-gray-100">
                        <td class="py-3 pl-6">${file.filename}</td>
                        <td>${file.type}</td>
                        <td>${getSize(file.size)}</td>
                        <td>${file.updatedAt}</td>
                        <td>
                            <div class="space-x-3">
                                <button class="px-2 py-1 text-white  bg-rose-400 hover:bg-rose-600">
                                    <i class="ri-delete-bin-4-line"></i>
                                </button>

                                <button class="px-2 py-1 text-white  bg-green-400 hover:bg-green-600">
                                    <i class="ri-download-line"></i>
                                </button>
                                <button class="px-2 py-1 text-white  bg-amber-400 hover:bg-amber-600">
                                    <i class="ri-share-line"></i>
                                </button>

                            </div>
                        </td>
                    </tr>

            `
            table.innerHTML += ui
        }
    }
    catch(err){
        toast.error(err.response ? err.response.data.message : err.message)
    }
}