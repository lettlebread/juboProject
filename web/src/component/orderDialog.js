import React, {useState, useEffect} from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Container } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import OrderItem from '../component/orderItem';

const OrderDialog = (props) => {
  const [name, setName] = useState('');
  const [orderItems, setOrderItems] = useState([]);

  const handleClose = () => {
    props.onClose();
  };

  const editButtonHandler = () => {
    props.openUpdateDialog();
  };

  const createButtonHanlder = () => {
    props.openCreateDialog();
  };

  let orderComponents = [];

  useEffect(() => {
    if (props.orderItemString) {
      setName(props.name);
      setOrderItems(JSON.parse(props.orderItemString));
    }
  }, [props]);

  orderItems.forEach((order) => {
    orderComponents.push(
      <OrderItem
        key={order._id}
        orderId={order._id}
        message={order.message}
        editButtonHandler={editButtonHandler}
      />
    );
  });

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
      <DialogTitle>病患資料</DialogTitle>
      <Container>
        <Typography variant="h5" component="h2">
          姓名 {name}
        </Typography>
        <Typography variant="h5" component="h2">
          醫囑
        </Typography>
        <IconButton color="primary" aria-label="edit order" component="span">
          <AddIcon onClick={createButtonHanlder}/>
        </IconButton>
        {orderComponents}
      </Container>
    </Dialog>
  );
}

export default OrderDialog;