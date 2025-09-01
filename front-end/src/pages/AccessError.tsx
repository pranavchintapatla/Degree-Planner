
//This component is called when a user tries to input the url for a page they dont have access to (e.g. students trying to access the staff page)

const AccessError = () => {
  return (
    <div>
      <h1>Whoops! You don't have access to this page.</h1>
    </div>
  )
}

export default AccessError
