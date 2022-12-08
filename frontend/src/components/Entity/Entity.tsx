import React, { memo, useLayoutEffect, useRef } from 'react'
import cx from 'classnames'

import s from './style.module.css'

interface EntityCellProps {
  cell: Vector2
  trace?: boolean
}

const PositionCell: React.FC<EntityCellProps> = ({ cell: { x, y }, trace = false }) => {
  const el = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (el.current === null || x === -1) return
    el.current.style.transform = `translate(calc(var(--d-cell-size) * ${x}), calc(var(--d-cell-size) * ${y})`
  }, [x, y])

  return <div ref={el} className={cx(s.cell, { [s.trace]: trace })} />
}

interface EntityCellsProps {
  position: Position
  trace?: boolean
}

const PositionCells: React.FC<EntityCellsProps> = ({ position, ...props }) => {
  return (
    <>
      {position.cells.map((cell, index) => (
        <PositionCell key={index} {...props} cell={cell} />
      ))}
    </>
  )
}
const FastPositionCells = memo(PositionCells)

type EntityProps = Pick<Entity, 'position'> // | 'trace'>

const Entity: React.FC<EntityProps> = ({
  position,
  // trace
}) => {
  return (
    <>
      <FastPositionCells position={position} />
      {/* {trace !== undefined && <FastPositionCells position={trace} trace />} */}
    </>
  )
}

export default Entity
