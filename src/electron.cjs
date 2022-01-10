const windowStateManager = require('electron-window-state');
const contextMenu = require('electron-context-menu');
const { app, BrowserWindow, Menu, MenuItem, ipcRenderer, ipcMain, dialog } = require('electron');
const serve = require('electron-serve');
const fs = require('fs');

try {
	require('electron-reloader')(module);
} catch (e) {
	console.error(e);
}

const serveURL = serve({ directory: '.' });
const port = process.env.PORT || 3000;
const dev = !app.isPackaged;
let mainWindow;

function createWindow() {
	let windowState = windowStateManager({
		defaultWidth: 1280,
		defaultHeight: 600,
	});

	const mainWindow = new BrowserWindow({
		backgroundColor: '#212431',
		titleBarStyle: 'hidden',
		autoHideMenuBar: true,
		trafficLightPosition: {
			x: 17,
			y: 24,
		},
		minHeight: 450,
		minWidth: 1280,
		webPreferences: {
			enableRemoteModule: true,
			contextIsolation: false,
			nodeIntegration: true,
			spellcheck: false,
			devTools: dev,
		},
		x: windowState.x,
		y: windowState.y,
		width: windowState.width,
		height: windowState.height,
	});

	windowState.manage(mainWindow);

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
		mainWindow.focus();
	});

	mainWindow.on('close', () => {
		windowState.saveState(mainWindow);
	});

	const isMac = process.platform === 'darwin';

	const openFile = () => {
		const file = dialog.showOpenDialogSync(mainWindow, {
			properties: ['openFile'],
			filters: [{ name: 'Presentation', extensions: ['json'] }],
		});

		if (file) {
			fs.readFile(file[0], 'utf8', (err, data) => {
				if (err) {
					return;
				}

				const fileData = {
					path: file[0],
					content: data,
				};

				mainWindow.webContents.send('fileopened', fileData);
			});
		}
	};

	const menu = Menu.buildFromTemplate([
		// { role: 'appMenu' }
		...(isMac ? [{
			label: 'ShowCase',
			submenu: [
				{ role: 'about' },
				{ type: 'separator' },
				{ role: 'services' },
				{ type: 'separator' },
				{ role: 'hide' },
				{ role: 'hideOthers' },
				{ role: 'unhide' },
				{ type: 'separator' },
				{ role: 'quit' },
			],
		}] : []),
		// { role: 'fileMenu' }
		{
			label: 'File',
			submenu: [
				isMac ? { role: 'close' } : { role: 'quit' },
				{
					label: 'Open presentation',
					accelerator: 'CmdOrCtrl+O',
					click: openFile
				}
			],
		}]);

	Menu.setApplicationMenu(menu);

	return mainWindow;
}

contextMenu({
	showLookUpSelection: false,
	showSearchWithGoogle: false,
	showCopyImage: false,
});

function loadVite(port) {
	mainWindow.loadURL(`http://localhost:${port}`).catch((e) => {
		console.log('Error loading URL, retrying', e);
		setTimeout(() => {
			loadVite(port);
		}, 200);
	});
}

function createMainWindow() {
	mainWindow = createWindow();
	mainWindow.once('close', () => {
		mainWindow = null;
	});

	if (dev) {
		loadVite(port);
		mainWindow.webContents.openDevTools();
	} else {
		serveURL(mainWindow);
	}
}

app.once('ready', createMainWindow);

app.on('activate', () => {
	if (!mainWindow) {
		createMainWindow();
	}
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
