import React from "react"
import styles from "../styles/select.module.scss"

const Select = ({ selected, options, onChange }) => {
  return (
    <>
      <select className={styles.select} id="select">
        {options.map(option => (
          <option
            key={option}
            className={styles.item}
            onClick={() => onChange && onChange(option)}
          >
            {option}
          </option>
        ))}
      </select>
      <form>
        {options.map(option => (
          <div key={option} className={styles.radioWrapper}>
            <input
              checked={option === selected}
              name="options"
              id={option}
              type="radio"
              className={styles.item}
              value={option}
              onChange={e => onChange(e.target.value)}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </form>
    </>
  )
}
export default Select
