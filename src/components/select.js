import React from "react"
import styles from "../styles/select.module.scss"

const Select = ({ selected, options, onChange }) => {
  return (
    <>
      <select
        onChange={e => onChange(e.target.value)}
        value={selected}
        className={styles.select}
        id="select"
      >
        {options.map(option => (
          <option key={option} value={option} className={styles.item}>
            {option}
          </option>
        ))}
      </select>
      <form onChange={e => onChange(e.target.value)}>
        {options.map(option => (
          <div key={option} className={styles.radioWrapper}>
            <input
              checked={option === selected}
              name="options"
              id={option}
              type="radio"
              className={styles.item}
              value={option}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </form>
    </>
  )
}
export default Select
