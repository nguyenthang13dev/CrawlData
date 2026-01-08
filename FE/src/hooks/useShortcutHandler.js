import { useKeyPress } from "./useKeyPress";
import { shortcuts } from "../utils/fileManagerUtils/shortcuts";
import { useClipBoard } from "../contexts/ClipboardContext";
import { useFileNavigation } from "../contexts/FileNavigationContext";
import { useSelection } from "../contexts/SelectionContext";
import { useLayout } from "../contexts/LayoutContext";
import { validateApiCallback } from "../utils/fileManagerUtils/validateApiCallback";
import { Modal } from "antd";

export const useShortcutHandler = (triggerAction, onRefresh) => {
  const { setClipBoard, handleCutCopy, handlePasting } = useClipBoard();
  const { currentFolder, currentPathFiles } = useFileNavigation();
  const { selectedFiles, setSelectedFiles, handleDownload } = useSelection();
  const { setActiveLayout } = useLayout();

  const perrmisson = selectedFiles[0]?.permission ?? {
    copy: true,
    delete: true,
    download: true,
    move: true,
    rename: true,
    share: true
  }

  const permissionAdd = currentFolder?.permission ?? {
    create: true,
    upload: true
  };


  const triggerCreateFolder = () => {
    permissionAdd.create && triggerAction.show("createFolder");
  };

  const triggerUploadFiles = () => {
    permissionAdd.upload && triggerAction.show("uploadFile");
  };

  const triggerCutItems = () => {
    if (perrmisson.move) {
      Modal.confirm({
        title: "Xác nhận di chuyển",
        content: "Nếu bạn di chuyển, thông tin phân quyền sẽ bị mất. Bạn có đồng ý không?",
        okText: "Đồng ý",
        cancelText: "Hủy",
        onOk: () => handleCutCopy(true),
      });
    }
  };

  const triggerCopyItems = () => {
    perrmisson.copy && handleCutCopy(false);
  };

  const triggerPasteItems = () => {
    handlePasting(currentFolder);
  };

  const triggerRename = () => {
    perrmisson.rename && triggerAction.show("rename");
  };

  const triggerDownload = () => {
    perrmisson.download && handleDownload();
  };

  const triggerDelete = () => {
    perrmisson.delete && triggerAction.show("delete");
  };

  const triggerSelectFirst = () => {
    if (currentPathFiles.length > 0) {
      setSelectedFiles([currentPathFiles[0]]);
    }
  };

  const triggerSelectLast = () => {
    if (currentPathFiles.length > 0) {
      setSelectedFiles([currentPathFiles.at(-1)]);
    }
  };

  const triggerSelectAll = () => {
    setSelectedFiles(currentPathFiles);
  };

  const triggerClearSelection = () => {
    setSelectedFiles((prev) => (prev.length > 0 ? [] : prev));
  };

  const triggerRefresh = () => {
    validateApiCallback(onRefresh, "onRefresh");
    setClipBoard(null);
  };

  const triggerGridLayout = () => {
    setActiveLayout("grid");
  };
  const triggerListLayout = () => {
    setActiveLayout("list");
  };

  // Keypress detection will be disbaled when some Action is in active state.
  useKeyPress(shortcuts.createFolder, triggerCreateFolder, triggerAction.isActive);
  useKeyPress(shortcuts.uploadFiles, triggerUploadFiles, triggerAction.isActive);
  useKeyPress(shortcuts.cut, triggerCutItems, triggerAction.isActive);
  useKeyPress(shortcuts.copy, triggerCopyItems, triggerAction.isActive);
  useKeyPress(shortcuts.paste, triggerPasteItems, triggerAction.isActive);
  useKeyPress(shortcuts.rename, triggerRename, triggerAction.isActive);
  useKeyPress(shortcuts.download, triggerDownload, triggerAction.isActive);
  useKeyPress(shortcuts.delete, triggerDelete, triggerAction.isActive);
  useKeyPress(shortcuts.jumpToFirst, triggerSelectFirst, triggerAction.isActive);
  useKeyPress(shortcuts.jumpToLast, triggerSelectLast, triggerAction.isActive);
  useKeyPress(shortcuts.selectAll, triggerSelectAll, triggerAction.isActive);
  useKeyPress(shortcuts.clearSelection, triggerClearSelection, triggerAction.isActive);
  useKeyPress(shortcuts.refresh, triggerRefresh, triggerAction.isActive);
  useKeyPress(shortcuts.gridLayout, triggerGridLayout, triggerAction.isActive);
  useKeyPress(shortcuts.listLayout, triggerListLayout, triggerAction.isActive);
};
