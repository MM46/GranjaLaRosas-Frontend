import React from 'react'
import '../../style/Form.css'
import logo from '../../img/lasRosasLogo.png'
export default function Form() {
    return (
        <form>
            <div className="form-class">
                <img src={logo} alt="Logo" />
                <div className="inputs">
                    <label>
                        Nombre:
                    <input type="text" class="formElement" id="first" />
                    </label>
                    <span id="first-text"></span>
                </div>
                <div>
                    <label>
                        Usuario:
                    <input type="text" class="formElement" id="last" />
                    </label>

                    <span id="last-text"></span>
                </div>
                <div>
                    <label>
                        Email:
                    <input type="email" class="formElement" id="email" />
                    </label>
                    <span id="email-text"></span>
                </div>
                <a className="link" href="#" ><p>¿Olvidaste la contraseña?</p> </a>
            </div>
            <div className="buttons">
                <button className="button-1">Ingresar </button>
                <button className="button-2">Registrarse </button>
            </div>
        </form>
    )
}
