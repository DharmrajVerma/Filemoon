window.onload = () => {
    showUserDetails()
}

const showUserDetails = async () => {
    const session = await getSession()
    console.log(session)
    const fullname  = document.getElementById("fullname")
    fullname.innerHTML = session.fullname
    const email = document.getElementById("email")
    email.innerHTML = session.email
}