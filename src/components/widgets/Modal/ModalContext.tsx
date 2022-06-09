import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion'
import React, { createContext, useRef, useState } from 'react'
import styled from 'styled-components'
import { Overlay } from 'components/Common/Overlay'
import {
  animationHandler,
  animationMap,
  animationVariants,
  appearAnimation,
  disappearAnimation,
} from 'utils/animationToolkit'
import { Handler } from 'components/widgets/Modal/types'

interface ModalsContext {
  isOpen: boolean
  nodeId: string
  modalNode: React.ReactNode
  setModalNode: React.Dispatch<React.SetStateAction<React.ReactNode>>
  onPresent: (node: React.ReactNode, newNodeId: string, closeOverlayClick: boolean) => void
  onDismiss: Handler
}

const ModalWrapper = styled(m.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndices.modal - 1};
  will-change: opacity;
  opacity: 0;
  &.appear {
    animation: ${appearAnimation} 0.3s ease-in-out forwards;
  }
  &.disappear {
    animation: ${disappearAnimation} 0.3s ease-in-out forwards;
  }
`

export const Context = createContext<ModalsContext>({
  isOpen: false,
  nodeId: '',
  modalNode: null,
  setModalNode: () => null,
  onPresent: () => null,
  onDismiss: () => null,
})

const ModalProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalNode, setModalNode] = useState<React.ReactNode>()
  const [nodeId, setNodeId] = useState('')
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true)
  const animationRef = useRef<HTMLDivElement>(null)

  const handlePresent = (node: React.ReactNode, newNodeId: string, closeOverlayClick: boolean) => {
    console.log('handlePresent = ', handlePresent)
    setModalNode(node)
    setIsOpen(true)
    setNodeId(newNodeId)
    setCloseOnOverlayClick(closeOverlayClick)
  }

  const handleDismiss = () => {
    setModalNode(undefined)
    setIsOpen(false)
    setNodeId('')
    setCloseOnOverlayClick(true)
  }

  const handleOverlayDismiss = () => {
    if (closeOnOverlayClick) {
      handleDismiss()
    }
  }

  return (
    <Context.Provider
      value={{
        isOpen,
        nodeId,
        modalNode,
        setModalNode,
        onPresent: handlePresent,
        onDismiss: handleDismiss,
      }}
    >
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isOpen && (
            <ModalWrapper
              ref={animationRef}
              onAnimationStart={() => animationHandler(animationRef.current)}
              {...animationMap}
              variants={animationVariants}
              transition={{ duration: 0.3 }}
            >
              <Overlay onClick={handleOverlayDismiss} />
              {React.isValidElement(modalNode) &&
                React.cloneElement(modalNode, {
                  onDismiss: handleDismiss,
                })}
            </ModalWrapper>
          )}
        </AnimatePresence>
      </LazyMotion>
      {children}
    </Context.Provider>
  )
}

export default ModalProvider
