<ui:composition xmlns="http://www.w3.org/1999/xhtml"
	xmlns:h="jakarta.faces.html" xmlns:p="http://primefaces.org/ui"
	xmlns:f="jakarta.faces.core" xmlns:ui="jakarta.faces.facelets">

	<p:dialog header="Cargar Documento" widgetVar="dlg2" modal="true"
		showEffect="fade" hideEffect="fade" resizable="false"
		styleClass="custom-dialog-header custom-dialog-title custom-dialog-content my-rounded-dialog">
		
		<p:outputLabel
			value="Selecciona un archivo legible y asignale un nombre facil de identificar."
			styleClass="custom-dialog-label" />

		<h:panelGroup id="custom-dialog-container-main_id"
			styleClass="custom-dialog-container-main">
			<p:panelGrid id="Panel2_id" columns="2" layout="grid"
				styleClass="input-grid dialog-container-filter"
				columnClasses="col-left">
				<p:panelGrid id="panel_3" columns="1" layout="grid"
					styleClass="input-grid-category">
					<h:panelGroup id="panel_4" layout="block"
						styleClass="panel-label-icon">
						<p:outputLabel for="category" value="Categoría"
							styleClass="custom-dialog-label-bold" />
						<h:graphicImage library="img" name="Help.png" alt="help" />
					</h:panelGroup>
					<p:selectOneMenu id="category"
						styleClass="custom-dialog-width-select custom-select-menu-placeholder custom-select-menu-icon custom-select-container">
						<f:selectItem itemLabel="Selecciona" itemValue=""
							itemDisabled="true" />
						<f:selectItems value="Value1" var="cat" itemLabel="Value 1"
							itemValue="ItemId" />
					</p:selectOneMenu>
				</p:panelGrid>
				<p:panelGrid id="panel_5" columns="1" layout="grid">
					<p:outputLabel for="docName" value="Nombre"
						styleClass="custom-dialog-label-bold" />
					<h:panelGroup id="panel_6"
						styleClass="custom-dialog-filter-container">
						<p:inputText id="docName" placeholder="Content" value=""
							styleClass="custom-dialog-width-input custom-input-placeholder dialog-input-text-font" />
						<p:outputLabel value="Máximo 00 caracteres"
							styleClass="custom-dialog-label" />
					</h:panelGroup>
				</p:panelGrid>
			</p:panelGrid>

			<h:form id="miFormularioCarga">
				<h:panelGroup id="fileupload-container" layout="block"
					styleClass="dialog-container-filter fileupload-flex-container">
					<p:outputPanel layout="block">
						<h:graphicImage library="img" name="document-upload.svg"
							alt="help" styleClass="dialog-fileupload-icon" />
					</p:outputPanel>
					<p:panelGrid id="panel_8" columns="1" layout="grid"
						styleClass="input-grid-fileupload">
						<p:outputLabel value="Cargar archivo"
							styleClass="dialog-fileupload-title" />
						<p:outputLabel value="Formato PDF, peso máximo 5 MB"
							styleClass="dialog-fileupload-desc" />
					</p:panelGrid>
					<p:outputPanel id="rose_upload" layout="block"
						styleClass="dialog-container-fileupload">
						<p:fileUpload mode="advanced" label="Seleccionar archivo"
							fileLimit="1" sizeLimit="1048576"
							auto="true" listener="#{fileUploadBean.errorRose}"
							onstart="startProcessUploadFile();"
							onerror="errorProcessUploadFile();"
							accept="application/pdf"  							
							styleClass="custom-fileupload-top custom-fileupload-bottom fileupload-custom-button custom-upload" />
					</p:outputPanel>
				</h:panelGroup>

				<h:panelGroup id="progressbar-container"
					styleClass="dialog-container-filter fileupload-flex-container-progress-bar">

					<p:outputPanel id="container_progress_image_ok_id" styleClass="upload-progressbar-icon-ok">
						<h:graphicImage library="img" name="document-upload.svg"
							alt="help" styleClass="dialog-fileupload-icon" />
					</p:outputPanel>
					
					<p:outputPanel id="container_progress_image_fin_id" styleClass="upload-progressbar-icon-ok">
						<h:graphicImage  library="img" name="document-add.svg"
							alt="help" styleClass="dialog-fileupload-icon" />
					</p:outputPanel>
					
					<p:outputPanel id="container_progress_image_err_id" styleClass="upload-progressbar-icon-ok">
						<h:graphicImage  library="img" name="document-error.svg"
							alt="help" styleClass="dialog-fileupload-icon" />
					</p:outputPanel>
					
					<h:panelGroup styleClass="fileupload-content-container">
						<p:outputLabel value="Poder-Notarial.pdf"
							styleClass="dialog-fileupload-title" />

						<p:progressBar id="uploadProgressBar" 
						ajax="true"  
							widgetVar="myProgressBar" value="#{fileUploadBean.progress}"
							interval="1000" styleClass="progressbar-custom">



							<p:ajax event="complete"
								listener="#{fileUploadBean.handleComplete}"
								oncomplete="endProcessuploadFile();"
								update="messages_progressbar" />


							<!-- error no soportado 
							<p:ajax event="progress" update="messages_progressbar" />
							 -->

						</p:progressBar>
						<p:messages id="messages_progressbar" showDetail="true" showSummary="false"/>
						
					</h:panelGroup>
					<h:graphicImage library="img" name="Trash.svg" alt="help"
						styleClass="dialog-fileupload-icon" />
				</h:panelGroup>

			</h:form>

			<h:panelGroup styleClass="dialog-container-filter">
				<p:outputPanel layout="block" styleClass="dialog-footer">
					<p:commandButton value="Cancelar"
						styleClass="custom-dialog-button-cancel default-order-button-cancel" />
					<p:commandButton value="Guardar" disabled="true"
						styleClass="custom-dialog-button default-order-button-ok" />
				</p:outputPanel>
			</h:panelGroup>
		</h:panelGroup>

		<script type="text/javascript">

			function errorProcessUploadFile(){
				console.log("ocurrio un error .");
			}

			function endProcessuploadFile(){//function handleCompleterose(){			
				console.log("endProcessuploadFile .");
				$('#miFormularioCarga\\:container_progress_image_ok_id').hide();
				$('#miFormularioCarga\\:container_progress_image_err_id').hide();
				$('#miFormularioCarga\\:container_progress_image_fin_id').show();
			}		
			

			function startProcessUploadFile(){
				console.log("Iniciando carga .");
				PF('myProgressBar').start();
				$('#miFormularioCarga\\:fileupload-container').hide();
				$('#miFormularioCarga\\:progressbar-container').show();
			}               
        
	        $(document).ready(function() {
	            console.log("rose dialog todo ok .");            
	    	    $('#miFormularioCarga\\:progressbar-container').hide();
	    	    $('#miFormularioCarga\\:container_progress_image_fin_id').hide();
	    	    $('#miFormularioCarga\\:container_progress_image_err_id').hide();
	    	    
	        });
    	</script>

	</p:dialog>
</ui:composition>