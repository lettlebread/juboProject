import { useDispatch} from 'react-redux';
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import { setCurrentOrder } from "../action";

const OrderItem = (props) => {
  const dispatch = useDispatch();

  const editButtonHanlder = () => {
    props.editButtonHandler();
    dispatch(setCurrentOrder({
      orderId: props.orderId,
      message: props.message
    }));
  }

  return (
    <Card>
        <CardContent>
        <Typography>
          內容: {props.message}
        </Typography>
        <IconButton color="primary" aria-label="edit order" component="span">
          <EditIcon onClick={editButtonHanlder}/>
        </IconButton>
        </CardContent>
    </Card>
  );
}

OrderItem.propTypes = {
  message: PropTypes.string
};

export default OrderItem;
