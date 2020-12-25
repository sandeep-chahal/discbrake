import React from "react"
import styles from "../styles/tabs.module.scss"

const Tabs = ({
  tabs = [],
  active,
  primaryButton,
  onButtonClick,
  onTabChange,
  disable = false,
}) => {
  return (
    <div className={styles.tabWrapper}>
      {tabs.map((tab, i) => (
        <div
          className={styles.tab}
          key={i}
          onClick={() => !disable && onTabChange(tab.toLowerCase())}
          style={{ opacity: active === tab.toLowerCase() ? 1 : 0.7 }}
        >
          {tab}
        </div>
      ))}
      {primaryButton && (
        <button
          className={styles.btn}
          disabled={disable}
          onClick={onButtonClick}
        >
          {primaryButton}
        </button>
      )}
    </div>
  )
}

export default Tabs
