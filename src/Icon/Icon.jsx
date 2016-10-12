import React from 'react'
import FontIcon from 'material-ui/FontIcon'

export const Icon = ({ ligature, ...props }) =>
  <FontIcon
    className="material-icons"
    {...props}
  >{ligature}</FontIcon>


const namedIcon = (ligature) =>
  (props) =>
    <Icon
      ligature={ligature}
      {...props}
    />


export const ACCOUNT_CIRCLE = 'account_circle'
export const ADD = 'add'
export const ADD_CIRCLE = 'add_circle'
export const ARROW_BACK = 'arrow_back'
export const ASSIGNMENT = 'assignment'
export const BUILD = 'build'
export const BUSINESS = 'business'
export const BACKSPACE = 'backspace'
export const CANCEL = 'cancel'
export const CHECK = 'check'
export const CHECK_CIRCLE = 'check_circle'
export const CLEAR = 'clear'
export const COMMENT = 'comment'
export const CREATE = 'create'
export const DELETE_FOREVER = 'delete_forever'
export const DESCRIPTION = 'description'
export const DIRECTIONS_CAR = 'directions_car'
export const DO_NOT_DISTURB_ALT = 'do_not_disturb_alt'
export const DONE = 'done'
export const EDIT = 'edit'
export const ERROR = 'error'
export const ERROR_OUTLINE = 'error_outline'
export const FLASH_ON = 'flash_on'
export const FORMAT_PAINT = 'format_paint'
export const HOME = 'home'
export const INFO_OUTLINE = 'info_outline'
export const LOCATION_ON = 'location_on'
export const LOCAL_OFFER = 'local_offer'
export const LOCAL_SHIPPING = 'local_shipping'
export const LOCK = 'lock'
export const MENU = 'menu'
export const MORE_VERT = 'more_vert'
export const NFC = 'nfc'
export const PALETTE = 'palette'
export const PEOPLE = 'people'
export const PERSON = 'person'
export const PERSON_ADD = 'person_add'
export const PHOTO_CAMERA = 'photo_camera'
export const REMOVE_RED_EYE = 'remove_red_eye'
export const RADIO_BUTTON_UNCHECKED = 'radio_button_unchecked'
export const SEARCH = 'search'
export const SETTINGS_CELL = 'settings_cell'
export const SMS_FAILED = 'sms_failed'
export const SUBJECT = 'subject'
export const SUPERVISOR_ACCOUNT = 'supervisor_account'
export const TRANSFER_WITHIN_A_STATION = 'transfer_within_a_station'
export const VISIBILITY = 'visibility'
export const VISIBILITY_OFF = 'visibility_off'

export const AccountCircleIcon = namedIcon(ACCOUNT_CIRCLE)
export const AddIcon = namedIcon(ADD)
export const AddCircleIcon = namedIcon(ADD_CIRCLE)
export const ArrowBackIcon = namedIcon(ARROW_BACK)
export const AssignmentIcon = namedIcon(ASSIGNMENT)
export const BuildIcon = namedIcon(BUILD)
export const BusinessIcon = namedIcon(BUSINESS)
export const BackspaceIcon = namedIcon(BACKSPACE)
export const CancelIcon = namedIcon(CANCEL)
export const CheckIcon = namedIcon(CHECK)
export const CheckCircleIcon = namedIcon(CHECK_CIRCLE)
export const ClearIcon = namedIcon(CLEAR)
export const CommentIcon = namedIcon(COMMENT)
export const CreateIcon = namedIcon(CREATE)
export const DescriptionIcon = namedIcon(DESCRIPTION)
export const DeleteForeverIcon = namedIcon(DELETE_FOREVER)
export const DirectionsCarIcon = namedIcon(DIRECTIONS_CAR)
export const DoNotDisturbAltIcon = namedIcon(DO_NOT_DISTURB_ALT)
export const DoneIcon = namedIcon(DONE)
export const EditIcon = namedIcon(EDIT)
export const ErrorIcon = namedIcon(ERROR)
export const ErrorOutlineIcon = namedIcon(ERROR_OUTLINE)
export const FlashOnIcon = namedIcon(FLASH_ON)
export const FormatPaintIcon = namedIcon(FORMAT_PAINT)
export const HomeIcon = namedIcon(HOME)
export const InfoOutlineIcon = namedIcon(INFO_OUTLINE)
export const LocationOnIcon = namedIcon(LOCATION_ON)
export const LocalOfferIcon = namedIcon(LOCAL_OFFER)
export const LocalShippingIcon = namedIcon(LOCAL_SHIPPING)
export const LockIcon = namedIcon(LOCK)
export const MenuIcon = namedIcon(MENU)
export const MoreVertIcon = namedIcon(MORE_VERT)
export const NFCIcon = namedIcon(NFC)
export const PaletteIcon = namedIcon(PALETTE)
export const PeopleIcon = namedIcon(PEOPLE)
export const PersonIcon = namedIcon(PERSON)
export const PersonAddIcon = namedIcon(PERSON_ADD)
export const PhotoCameraIcon = namedIcon(PHOTO_CAMERA)
export const RemoveRedEyeIcon = namedIcon(REMOVE_RED_EYE)
export const RadioButtonUncheckedIcon = namedIcon(RADIO_BUTTON_UNCHECKED)
export const SearchIcon = namedIcon(SEARCH)
export const SettingsCellIcon = namedIcon(SETTINGS_CELL)
export const SmsFailedIcon = namedIcon(SMS_FAILED)
export const SubjectIcon = namedIcon(SUBJECT)
export const SupervisorAccountIcon = namedIcon(SUPERVISOR_ACCOUNT)
export const TransferWithinAStationIcon = namedIcon(TRANSFER_WITHIN_A_STATION)
export const VisibilityIcon = namedIcon(VISIBILITY)
export const VisibilityOffIcon = namedIcon(VISIBILITY_OFF)
