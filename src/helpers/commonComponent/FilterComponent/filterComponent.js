import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import {
  CollectValuesByKey,
  ConvertAndRemoveDuplicates,
  ReactIcon,
  RemoveDuplicates,
} from "../../functionHelper";
import { useDispatch } from "react-redux";
import { StoreSearchFilterValue } from "../../../reduxStore/Action/bookApiAction";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function MultipleSelectCheckmarks({ allPropsData }) {
  const [personName, setPersonName] = React.useState([]);
  const { filterData, setFilterData, data } = allPropsData;
  const { title, valueList } = data;

  const handleChange = (event) => {
    const {
      target: { value, name },
    } = event;
    const dataForStore = typeof value === "string" ? value.split(",") : value;
    setPersonName(dataForStore);
    setFilterData({ ...filterData, [title]: dataForStore });
  };

  const checkBoxValue = (name) => {
    const valueArray = filterData[title] || [];
    return valueArray.indexOf(name);
  };

  const ReturnName = (value) => {
    const newValue = value;

    if (typeof newValue == "boolean") {
      if (newValue) {
        return "Available";
      } else {
        return "Unavailable";
      }
    } else {
      return newValue;
    }
  };
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">
          {`${title}`.toUpperCase()}
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          name={title}
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {valueList?.map((name) => (
            <MenuItem key={name} value={name}>
              {/* <Checkbox checked={personName.indexOf(name) > -1} /> */}
              <Checkbox checked={checkBoxValue(name) > -1} />
              <ListItemText primary={ReturnName(name)} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FilterComponent() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [bookData, setBookData] = React.useState([]);
  const [filterData, setFilterData] = React.useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const BookListState = useSelector((state) => state.book);
  const allPropsData = {
    filterData: filterData,
    setFilterData: setFilterData,
  };

  const onHandleFilter = () => {
    // dispatch(setFilterObject(filterData));
    dispatch(StoreSearchFilterValue({ type: "filter", data: filterData }));
    handleClose();
  };
  React.useEffect(() => {
    const OptionObject = CollectValuesByKey(
      BookListState?.BookResponse?.data?.data ?? []
    );
    setBookData(OptionObject);
  }, [BookListState]);

  React.useEffect(() => {
    console.log(filterData);
  }, [open]);
  return (
    <div>
      <ul className="cs_mp0">
        <li className={"active"}>
          <span onClick={handleOpen}>Filter</span>
        </li>
      </ul>
      {/* <Button
        onClick={handleOpen}
        className="whitespace-nowrap"
        variant="contained"
        color="primary"
        startIcon={
          // <FuseSvgIcon size={20}>heroicons-outline:filter</FuseSvgIcon>
          <> {ReactIcon({ iconName: `AiOutlineFilter` })}</>
        }
      >
        Filter
      </Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Filter
          </Typography>
          {bookData?.map((i, index) => {
            return (
              <>
                <div key={index}>
                  <MultipleSelectCheckmarks
                    // allPropsData={{...allPropsData,data:{...i,valueList:i.title == "currentAvailability"?ConvertAndRemoveDuplicates(i?.valueList??[]):RemoveDuplicates(i?.valueList??[])}}}/>
                    allPropsData={{
                      ...allPropsData,
                      data: {
                        ...i,
                        valueList: RemoveDuplicates(i?.valueList ?? []),
                      },
                    }}
                  />
                </div>
              </>
            );
          })}
          <div className="d-flex justify-content-end">
            <button className="btn btn-success" onClick={onHandleFilter}>
              Click For Filter
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
