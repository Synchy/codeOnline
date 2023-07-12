import { useNavigate } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import { useState, useContext } from "react"
import { ErrorMessage } from "@hookform/error-message"
import { fileContext } from "utils/context/FileContext"
import { NEW_FILE_MUTATION } from "graphql/mutations/NEW_FILE_MUTATION"
import { useMutation } from "@apollo/client"
import { ILanguageProps } from "utils/interface/ILanguage"

interface INewFile {
  filename: string
  isPublic: boolean
  languageId: number
}



const AddNewFile = () => {
  const [language, setLanguage] = useState<number>(0)
  const { Languages, handleCloseModal } = useContext(fileContext)
  const [addFile, { loading }] = useMutation(NEW_FILE_MUTATION)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<INewFile>({ mode: "onBlur" })
  const onSubmit: SubmitHandler<INewFile> = async (data) => {
    try {
      const result = await addFile({
        variables: {
          inputFile: {
            filename: data.filename,
            isPublic: data.isPublic
          },
          languageId: language
        }
      })
      handleCloseModal()
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <div className="container-card-form">
      <h2>Créer un nouveau fichier</h2>
      <span onClick={handleCloseModal}>X</span>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="container-input">
          <label htmlFor="filename"> Nom du fichier</label>
          <input
            type="text"
            id="filename"
            placeholder="Nom du fichier"
            {...register("filename", {
              required: "Ce champ est requis !",
              minLength: 1
            })}
          />
          <ErrorMessage
            errors={errors}
            name="filename"
            render={({ message }) => <p className="error-input"> {message}</p>}
          />
        </div>
        <div className="container-input">
          <label htmlFor="languages"> Langage</label>
          <select
            id="languages"
            {...register("languageId", {
              required: "Ce champ est requis !"
            })}
            onChange={(e) => {
              setLanguage(parseInt(e.target.value))
            }}
          >
            {Languages.map((language: ILanguageProps) => {
              return (
                <option value={language.id} key={language.id}>
                  {language.name}
                </option>
              )
            })}
          </select>
        </div>
        <div className="container-input-checkbox">
          <input type="checkbox" id="privé" {...register("isPublic")} />
          <label htmlFor="privé">Marquer comme privé</label>
        </div>
        <button className="button-form" disabled={loading}>
          valider
        </button>
      </form>
    </div>
  )
}

export default AddNewFile
