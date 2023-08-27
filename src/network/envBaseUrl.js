/*
 * @Author: 王磊
 * @Date: 2021-08-27 14:11:40
 * @LastEditTime: 2022-03-11 18:14:12
 * @LastEditors: Please set LastEditors
 * @Description: 纯环境域名，不走axios
 * @FilePath: \project\vueProject\vue_template\src\network\envBaseUrl.js
 */
export const downloadFile = `${process.env.VUE_APP_BASEURL}/file/download/file`; // 下载文件
export const uploadFile = `${process.env.VUE_APP_BASEURL}/file/fileupload/uploadBiz`; // 上传文件
export const previewFilePDF = `${process.env.VUE_APP_BASEURL}/file/download/previewFilePDF`; // 线上(非图片预览)
export const previewImg = `${process.env.VUE_APP_BASEURL}/file/download/previewFile`; // 线上(图片预览)
// 待办跳转地址
export const toDo = `${process.env.VUE_APP_PAGEURL}/constructioncontract`;
