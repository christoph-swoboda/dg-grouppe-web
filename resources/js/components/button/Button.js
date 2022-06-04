import React from "react";
import PropTypes from "prop-types";
import '../../style/button.scss';
import {useStateValue} from "../../states/StateProvider";
import {BeatLoader} from "react-spinners";

const Button = (props) => {

    const disabled = '';
    const [{deliveryMethod,basket}, dispatch] = useStateValue();

    function submit() {
        dispatch(
            {
                type: "SetModal",
                item: true
            })
    }

    return (
        <div className='button'>
            {
                 (props.normal) ?
                <button
                disabled={props.cancel}
                className={ props.dark? 'button-dim-enabled':!props.cancel &&!props.dark? 'button-glow' : 'button-dim'}
                >
                    {
                        (!props.loading)?
                            props.name
                            :
                            <BeatLoader size={10} color={'#a2a2a2'}/>
                    }
                </button>:
                (!props.admin) ?
                    <button
                        disabled={basket.length > 0 ? disabled : !disabled}
                        className={basket.length > 0 && deliveryMethod.deliveryMethod && !props.cancel ? 'button-glow' : 'button-dim'}
                        onClick={submit}
                    >
                        {
                            (!props.loading)?
                                props.name
                                :
                                <BeatLoader size={10} color={'#a2a2a2'}/>
                        }
                    </button>
                    : (!props.addProduct) ?
                    <button
                        disabled={!props.cancel ? disabled : !disabled}
                        className={!props.cancel ? 'button-glow' : 'button-dim'}
                        onClick={submit}
                    >
                        {
                            (!props.loading)?
                                props.name
                                :
                                <BeatLoader size={10} color={'#a2a2a2'}/>
                        }

                    </button>
                        :
                    ''
            }
        </div>
    )
}
export default Button

Button.propTypes = {
    name: PropTypes.string,
    cancel: PropTypes.bool,
    admin: PropTypes.bool,
    loading:PropTypes.bool
}
