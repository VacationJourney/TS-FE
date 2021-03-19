import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { withStyles, Menu, MenuItem, ListItemIcon } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const StyledMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5',
	},
})(props => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		{...props}
	/>
));

const StyledMenuItem = withStyles(theme => ({
	root: {
		'&:focus': {
			backgroundColor: 'black',
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				color: theme.palette.common.white,
			},
		},
	},
}))(MenuItem);

const CustomizedMenus = ({exit}) => {
	
	const history = useHistory();
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<MenuIcon
				aria-controls='customized-menu'
				aria-haspopup='true'
				variant='contained'
				fontSize='large'
				color='inherit'
				onClick={handleClick}
			></MenuIcon>
			<StyledMenu
				id='customized-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<StyledMenuItem>
					<ListItemIcon>
						<HomeIcon onClick={() => history.push('/vacations')}fontSize='large'></HomeIcon>
					</ListItemIcon>
				</StyledMenuItem>
				<StyledMenuItem>
					<ListItemIcon>
						<ExitToAppIcon onClick={exit} fontSize='large' />
					</ListItemIcon>
				</StyledMenuItem>
			</StyledMenu>
		</div>
	);
};
export default CustomizedMenus;
