import React from 'react'
import { Button, ButtonGroup as ReactButtonGroup, makeStyles } from '@material-ui/core'
import classNames from 'classnames'

const useStyles = makeStyles(() => ({
  button: {
    textTransform: 'none',
    borderRadius: 4,
    border: '1px solid #1b1b1b',
    backgroundColor: '#1b1b1b',
    color: '#00b0ff',
    fontWeight: 400,
    width: 148,
    '&:hover': {
      opacity: 0.9,
      backgroundColor: '#1b1b1b',
      border: '1px solid #1b1b1b',
    },
  },
  selectedButton: {
    backgroundColor: '#00b0ff',
    color: '#1b1b1b',
    fontWeight: 500,
    '&:hover': {
        opacity: 0.97,
        backgroundColor: '#00b0ff',
        border: '1px solid #1b1b1b',
      },
  },
}))

const ButtonGroup = ({ selectedType, items, onItemSelected, disabled }) => {
  const classes = useStyles()

  return (
    <ReactButtonGroup color="primary">
      {items.map(item => (
        <Button
          className={classNames(classes.button, {
            [classes.selectedButton]: selectedType === item.type,
          })}
          disabled={disabled}
          key={item.label}
          onClick={() => onItemSelected(item)}
        >
          {item.label}
        </Button>
      ))}
    </ReactButtonGroup>
  )
}

export default ButtonGroup
