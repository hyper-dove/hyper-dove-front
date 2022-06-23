import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg {...props} viewBox="0 0 239 38">
      <path
        d="M17.124 29C16.716 29 16.38 28.868 16.116 28.604C15.852 28.34 15.72 28.016 15.72 27.632V18.272C15.72 16.784 15.432 15.56 14.856 14.6C14.304 13.64 13.536 12.92 12.552 12.44C11.592 11.96 10.5 11.72 9.276 11.72C8.1 11.72 7.032 11.948 6.072 12.404C5.136 12.86 4.392 13.484 3.84 14.276C3.288 15.068 3.012 15.968 3.012 16.976H1.032C1.08 15.464 1.488 14.12 2.256 12.944C3.024 11.744 4.044 10.808 5.316 10.136C6.588 9.44 8.004 9.092 9.564 9.092C11.268 9.092 12.792 9.452 14.136 10.172C15.48 10.868 16.536 11.9 17.304 13.268C18.096 14.636 18.492 16.304 18.492 18.272V27.632C18.492 28.016 18.36 28.34 18.096 28.604C17.832 28.868 17.508 29 17.124 29ZM1.644 29C1.212 29 0.864 28.88 0.6 28.64C0.36 28.376 0.24 28.04 0.24 27.632V10.712C0.24 10.28 0.36 9.944 0.6 9.704C0.864 9.44 1.212 9.308 1.644 9.308C2.052 9.308 2.376 9.44 2.616 9.704C2.88 9.944 3.012 10.28 3.012 10.712V27.632C3.012 28.04 2.88 28.376 2.616 28.64C2.376 28.88 2.052 29 1.644 29ZM26.5113 29C26.1513 29 25.8393 28.88 25.5753 28.64C25.3113 28.376 25.1793 28.028 25.1793 27.596V9.344C25.1793 7.664 25.4673 6.188 26.0433 4.916C26.6193 3.644 27.4713 2.66 28.5993 1.964C29.7273 1.244 31.1073 0.883999 32.7393 0.883999C33.1473 0.883999 33.4833 1.004 33.7473 1.244C34.0113 1.484 34.1433 1.784 34.1433 2.144C34.1433 2.504 34.0113 2.804 33.7473 3.044C33.4833 3.284 33.1473 3.404 32.7393 3.404C31.6593 3.404 30.7593 3.656 30.0393 4.16C29.3433 4.64 28.8153 5.324 28.4553 6.212C28.1193 7.076 27.9513 8.072 27.9513 9.2V27.596C27.9513 28.028 27.8193 28.376 27.5553 28.64C27.3153 28.88 26.9673 29 26.5113 29ZM22.8753 12.44C22.4913 12.44 22.1793 12.332 21.9393 12.116C21.7233 11.876 21.6153 11.588 21.6153 11.252C21.6153 10.892 21.7233 10.604 21.9393 10.388C22.1793 10.148 22.4913 10.028 22.8753 10.028H32.2713C32.6553 10.028 32.9553 10.148 33.1713 10.388C33.4113 10.604 33.5313 10.892 33.5313 11.252C33.5313 11.588 33.4113 11.876 33.1713 12.116C32.9553 12.332 32.6553 12.44 32.2713 12.44H22.8753ZM44.4109 29C43.1389 29 41.9989 28.7 40.9909 28.1C40.0069 27.5 39.2269 26.684 38.6509 25.652C38.0749 24.596 37.7869 23.396 37.7869 22.052V4.448C37.7869 4.04 37.9069 3.704 38.1469 3.44C38.4109 3.176 38.7469 3.044 39.1549 3.044C39.5629 3.044 39.8989 3.176 40.1629 3.44C40.4269 3.704 40.5589 4.04 40.5589 4.448V22.052C40.5589 23.276 40.9189 24.284 41.6389 25.076C42.3589 25.844 43.2829 26.228 44.4109 26.228H45.3829C45.7669 26.228 46.0789 26.36 46.3189 26.624C46.5589 26.888 46.6789 27.224 46.6789 27.632C46.6789 28.04 46.5349 28.376 46.2469 28.64C45.9589 28.88 45.5989 29 45.1669 29H44.4109ZM35.4469 12.44C35.0869 12.44 34.7869 12.332 34.5469 12.116C34.3069 11.876 34.1869 11.588 34.1869 11.252C34.1869 10.892 34.3069 10.604 34.5469 10.388C34.7869 10.148 35.0869 10.028 35.4469 10.028H44.6269C44.9869 10.028 45.2869 10.148 45.5269 10.388C45.7669 10.604 45.8869 10.892 45.8869 11.252C45.8869 11.588 45.7669 11.876 45.5269 12.116C45.2869 12.332 44.9869 12.44 44.6269 12.44H35.4469ZM47.4473 31.808C47.0393 31.808 46.7033 31.664 46.4393 31.376C46.1753 31.112 46.0433 30.788 46.0433 30.404C46.0433 30.02 46.1753 29.684 46.4393 29.396C46.7033 29.132 47.0393 29 47.4473 29H64.6913C65.0753 29 65.3993 29.132 65.6633 29.396C65.9273 29.684 66.0593 30.02 66.0593 30.404C66.0593 30.788 65.9273 31.112 65.6633 31.376C65.3993 31.664 65.0753 31.808 64.6913 31.808H47.4473ZM75.6622 29.18C73.8142 29.18 72.1582 28.748 70.6942 27.884C69.2302 26.996 68.0662 25.796 67.2022 24.284C66.3622 22.772 65.9422 21.068 65.9422 19.172C65.9422 17.252 66.3742 15.536 67.2382 14.024C68.1262 12.512 69.3262 11.324 70.8382 10.46C72.3502 9.572 74.0542 9.128 75.9502 9.128C77.8462 9.128 79.5382 9.572 81.0262 10.46C82.5382 11.324 83.7262 12.512 84.5902 14.024C85.4782 15.536 85.9342 17.252 85.9582 19.172L84.8422 20.036C84.8422 21.764 84.4342 23.324 83.6182 24.716C82.8262 26.084 81.7342 27.176 80.3422 27.992C78.9742 28.784 77.4142 29.18 75.6622 29.18ZM75.9502 26.66C77.3422 26.66 78.5782 26.336 79.6582 25.688C80.7622 25.04 81.6262 24.152 82.2502 23.024C82.8982 21.872 83.2222 20.588 83.2222 19.172C83.2222 17.732 82.8982 16.448 82.2502 15.32C81.6262 14.192 80.7622 13.304 79.6582 12.656C78.5782 11.984 77.3422 11.648 75.9502 11.648C74.5822 11.648 73.3462 11.984 72.2422 12.656C71.1382 13.304 70.2622 14.192 69.6142 15.32C68.9662 16.448 68.6422 17.732 68.6422 19.172C68.6422 20.588 68.9662 21.872 69.6142 23.024C70.2622 24.152 71.1382 25.04 72.2422 25.688C73.3462 26.336 74.5822 26.66 75.9502 26.66ZM84.5542 29C84.1462 29 83.8102 28.88 83.5462 28.64C83.2822 28.376 83.1502 28.04 83.1502 27.632V21.476L83.8342 18.632L85.9582 19.172V27.632C85.9582 28.04 85.8262 28.376 85.5622 28.64C85.2982 28.88 84.9622 29 84.5542 29ZM92.2135 37.424C91.7815 37.424 91.4335 37.292 91.1695 37.028C90.9295 36.788 90.8095 36.452 90.8095 36.02V19.028C90.8335 17.156 91.2775 15.476 92.1415 13.988C93.0295 12.476 94.2175 11.288 95.7055 10.424C97.2175 9.56 98.9095 9.128 100.782 9.128C102.702 9.128 104.418 9.572 105.93 10.46C107.442 11.324 108.63 12.512 109.494 14.024C110.382 15.536 110.826 17.252 110.826 19.172C110.826 21.068 110.394 22.772 109.53 24.284C108.69 25.796 107.538 26.996 106.074 27.884C104.61 28.748 102.954 29.18 101.106 29.18C99.4975 29.18 98.0335 28.844 96.7135 28.172C95.4175 27.476 94.3735 26.564 93.5815 25.436V36.02C93.5815 36.452 93.4495 36.788 93.1855 37.028C92.9455 37.292 92.6215 37.424 92.2135 37.424ZM100.782 26.66C102.174 26.66 103.422 26.336 104.526 25.688C105.63 25.04 106.494 24.152 107.118 23.024C107.766 21.872 108.09 20.588 108.09 19.172C108.09 17.732 107.766 16.448 107.118 15.32C106.494 14.192 105.63 13.304 104.526 12.656C103.422 11.984 102.174 11.648 100.782 11.648C99.4135 11.648 98.1775 11.984 97.0735 12.656C95.9695 13.304 95.1055 14.192 94.4815 15.32C93.8575 16.448 93.5455 17.732 93.5455 19.172C93.5455 20.588 93.8575 21.872 94.4815 23.024C95.1055 24.152 95.9695 25.04 97.0735 25.688C98.1775 26.336 99.4135 26.66 100.782 26.66ZM117.127 37.424C116.695 37.424 116.347 37.292 116.083 37.028C115.843 36.788 115.723 36.452 115.723 36.02V19.028C115.747 17.156 116.191 15.476 117.055 13.988C117.943 12.476 119.131 11.288 120.619 10.424C122.131 9.56 123.823 9.128 125.695 9.128C127.615 9.128 129.331 9.572 130.843 10.46C132.355 11.324 133.543 12.512 134.407 14.024C135.295 15.536 135.739 17.252 135.739 19.172C135.739 21.068 135.307 22.772 134.443 24.284C133.603 25.796 132.451 26.996 130.987 27.884C129.523 28.748 127.867 29.18 126.019 29.18C124.411 29.18 122.947 28.844 121.627 28.172C120.331 27.476 119.287 26.564 118.495 25.436V36.02C118.495 36.452 118.363 36.788 118.099 37.028C117.859 37.292 117.535 37.424 117.127 37.424ZM125.695 26.66C127.087 26.66 128.335 26.336 129.439 25.688C130.543 25.04 131.407 24.152 132.031 23.024C132.679 21.872 133.003 20.588 133.003 19.172C133.003 17.732 132.679 16.448 132.031 15.32C131.407 14.192 130.543 13.304 129.439 12.656C128.335 11.984 127.087 11.648 125.695 11.648C124.327 11.648 123.091 11.984 121.987 12.656C120.883 13.304 120.019 14.192 119.395 15.32C118.771 16.448 118.459 17.732 118.459 19.172C118.459 20.588 118.771 21.872 119.395 23.024C120.019 24.152 120.883 25.04 121.987 25.688C123.091 26.336 124.327 26.66 125.695 26.66ZM149.564 29.18C147.62 29.18 145.892 28.76 144.38 27.92C142.892 27.056 141.716 25.868 140.852 24.356C140.012 22.844 139.592 21.116 139.592 19.172C139.592 17.204 139.988 15.476 140.78 13.988C141.596 12.476 142.712 11.288 144.128 10.424C145.544 9.56 147.176 9.128 149.024 9.128C150.848 9.128 152.432 9.548 153.776 10.388C155.144 11.204 156.2 12.344 156.944 13.808C157.688 15.272 158.06 16.94 158.06 18.812C158.06 19.196 157.94 19.508 157.7 19.748C157.46 19.964 157.148 20.072 156.764 20.072H141.464V17.768H157.052L155.504 18.884C155.528 17.492 155.276 16.244 154.748 15.14C154.22 14.036 153.464 13.172 152.48 12.548C151.52 11.924 150.368 11.612 149.024 11.612C147.656 11.612 146.456 11.936 145.424 12.584C144.392 13.232 143.588 14.132 143.012 15.284C142.46 16.412 142.184 17.708 142.184 19.172C142.184 20.636 142.496 21.932 143.12 23.06C143.768 24.188 144.644 25.076 145.748 25.724C146.852 26.372 148.124 26.696 149.564 26.696C150.428 26.696 151.292 26.552 152.156 26.264C153.044 25.952 153.752 25.568 154.28 25.112C154.544 24.896 154.844 24.788 155.18 24.788C155.516 24.764 155.804 24.848 156.044 25.04C156.356 25.328 156.512 25.64 156.512 25.976C156.536 26.312 156.404 26.6 156.116 26.84C155.324 27.512 154.316 28.076 153.092 28.532C151.868 28.964 150.692 29.18 149.564 29.18ZM169.913 29C168.641 29 167.501 28.7 166.493 28.1C165.509 27.5 164.729 26.684 164.153 25.652C163.577 24.596 163.289 23.396 163.289 22.052V4.448C163.289 4.04 163.409 3.704 163.649 3.44C163.913 3.176 164.249 3.044 164.657 3.044C165.065 3.044 165.401 3.176 165.665 3.44C165.929 3.704 166.061 4.04 166.061 4.448V22.052C166.061 23.276 166.421 24.284 167.141 25.076C167.861 25.844 168.785 26.228 169.913 26.228H170.885C171.269 26.228 171.581 26.36 171.821 26.624C172.061 26.888 172.181 27.224 172.181 27.632C172.181 28.04 172.037 28.376 171.749 28.64C171.461 28.88 171.101 29 170.669 29H169.913ZM160.949 12.44C160.589 12.44 160.289 12.332 160.049 12.116C159.809 11.876 159.689 11.588 159.689 11.252C159.689 10.892 159.809 10.604 160.049 10.388C160.289 10.148 160.589 10.028 160.949 10.028H170.129C170.489 10.028 170.789 10.148 171.029 10.388C171.269 10.604 171.389 10.892 171.389 11.252C171.389 11.588 171.269 11.876 171.029 12.116C170.789 12.332 170.489 12.44 170.129 12.44H160.949ZM178.133 29C177.701 29 177.353 28.88 177.089 28.64C176.849 28.376 176.729 28.028 176.729 27.596V10.712C176.729 10.28 176.849 9.944 177.089 9.704C177.353 9.44 177.701 9.308 178.133 9.308C178.541 9.308 178.865 9.44 179.105 9.704C179.369 9.944 179.501 10.28 179.501 10.712V27.596C179.501 28.028 179.369 28.376 179.105 28.64C178.865 28.88 178.541 29 178.133 29ZM178.097 5.564C177.569 5.564 177.113 5.372 176.729 4.988C176.345 4.604 176.153 4.136 176.153 3.584C176.153 2.984 176.345 2.516 176.729 2.18C177.137 1.82 177.605 1.64 178.133 1.64C178.637 1.64 179.081 1.82 179.465 2.18C179.873 2.516 180.077 2.984 180.077 3.584C180.077 4.136 179.885 4.604 179.501 4.988C179.117 5.372 178.649 5.564 178.097 5.564ZM187.64 28.064L185.372 26.84L198.764 9.812L200.636 11.396L187.64 28.064ZM186.38 29C185.54 29 185.12 28.58 185.12 27.74C185.12 26.9 185.54 26.48 186.38 26.48H199.736C200.576 26.48 200.996 26.9 200.996 27.74C200.996 28.58 200.576 29 199.736 29H186.38ZM186.236 11.828C185.396 11.828 184.976 11.408 184.976 10.568C184.976 9.728 185.396 9.308 186.236 9.308H199.592C200.432 9.308 200.852 9.728 200.852 10.568C200.852 11.408 200.432 11.828 199.592 11.828H186.236ZM213.462 29.18C211.518 29.18 209.79 28.76 208.278 27.92C206.79 27.056 205.614 25.868 204.75 24.356C203.91 22.844 203.49 21.116 203.49 19.172C203.49 17.204 203.886 15.476 204.678 13.988C205.494 12.476 206.61 11.288 208.026 10.424C209.442 9.56 211.074 9.128 212.922 9.128C214.746 9.128 216.33 9.548 217.674 10.388C219.042 11.204 220.098 12.344 220.842 13.808C221.586 15.272 221.958 16.94 221.958 18.812C221.958 19.196 221.838 19.508 221.598 19.748C221.358 19.964 221.046 20.072 220.662 20.072H205.362V17.768H220.95L219.402 18.884C219.426 17.492 219.174 16.244 218.646 15.14C218.118 14.036 217.362 13.172 216.378 12.548C215.418 11.924 214.266 11.612 212.922 11.612C211.554 11.612 210.354 11.936 209.322 12.584C208.29 13.232 207.486 14.132 206.91 15.284C206.358 16.412 206.082 17.708 206.082 19.172C206.082 20.636 206.394 21.932 207.018 23.06C207.666 24.188 208.542 25.076 209.646 25.724C210.75 26.372 212.022 26.696 213.462 26.696C214.326 26.696 215.19 26.552 216.054 26.264C216.942 25.952 217.65 25.568 218.178 25.112C218.442 24.896 218.742 24.788 219.078 24.788C219.414 24.764 219.702 24.848 219.942 25.04C220.254 25.328 220.41 25.64 220.41 25.976C220.434 26.312 220.302 26.6 220.014 26.84C219.222 27.512 218.214 28.076 216.99 28.532C215.766 28.964 214.59 29.18 213.462 29.18ZM227.26 16.868C227.332 15.38 227.716 14.048 228.412 12.872C229.132 11.696 230.056 10.772 231.184 10.1C232.336 9.428 233.608 9.092 235 9.092C236.104 9.092 236.956 9.248 237.556 9.56C238.156 9.872 238.384 10.328 238.24 10.928C238.144 11.288 237.976 11.528 237.736 11.648C237.52 11.768 237.244 11.816 236.908 11.792C236.596 11.768 236.236 11.744 235.828 11.72C234.484 11.6 233.284 11.744 232.228 12.152C231.196 12.536 230.368 13.136 229.744 13.952C229.144 14.768 228.844 15.74 228.844 16.868H227.26ZM227.476 29C227.044 29 226.708 28.88 226.468 28.64C226.228 28.4 226.108 28.064 226.108 27.632V10.676C226.108 10.244 226.228 9.908 226.468 9.668C226.708 9.428 227.044 9.308 227.476 9.308C227.908 9.308 228.244 9.428 228.484 9.668C228.724 9.908 228.844 10.244 228.844 10.676V27.632C228.844 28.064 228.724 28.4 228.484 28.64C228.244 28.88 227.908 29 227.476 29Z"
        fill="white"
      />
    </Svg>
  )
}

export default Icon
