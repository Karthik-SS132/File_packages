function fn_manage_stock_enquiry()
{
	item_list=[{i_code:"ALL",item_de:"ALL",variant_code:"ALL",variant_de:"ALL"}];
	item_list1=[];
	itemlistdata=[];
	itemlistdata[0]=[];
	$("#item_code").kendoComboBox();
	executeService_retrieve_listof_item_master();
        
    var a='i_code';
	var collist = [];
	collist[0] = new Array(2);
	collist[1] = new Array(2);
	collist[2] = new Array(2);
	collist[3] = new Array(2);
	collist[0].push({column_name:'i_code',column_index:'1'});
	collist[1].push({column_name:'item_de',column_index:'5'});
	collist[2].push({column_name:'variant_code',column_index:'5'});
	collist[3].push({column_name:'variant_de',column_index:'5'});
					
        dup_rem=duplication_removel(item_list,a, 2, collist);
        itemlistdata=new kendo.data.DataSource({data:item_list});
	filtered_varcode=[];	
 $("#item_code").kendoComboBox({
	index:0,
    filter: "contains",
    dataTextField: "i_code",
    dataValueField: "i_code",
    dataSource:dup_rem,
	template:'${ data.i_code }'+'-'+'${ data.item_de }',
	 change: function() {
                             /*values = this.value();
                            
                            if (values) {
                                value1 = values;
								//itemlistdata.add({text:"ALL",value:"ALL"});
                   itemlistdata.filter({
				                     
                                    field: "i_code",
                                    operator: "eq",
                                    value: value1
                                });
								//itemlistdata.add({i_code:"ALL",item_de:"ALL",variant_code:"ALL",variant_de:"ALL"});
								
                               //$('#var_code').attr('enabled','enabled');
                               variantcode.enable(true);
							   //itemlistdata.add({i_code:"ALL",var_code:"ALL"});
                             
                            } else {
							
                           variantcode.enable(false);
                            }
                          variantcode.value("");*/
						variantcode.enable(true);
						filtered_varcode = [{variant_code:"ALL",variant_de:"ALL"}];
						if(this.value() !="")
						{
							for(var i=0;i<item_list.length;i++)
							{
							if(item_list[i].i_code == this.value())
							{
					
								filtered_varcode.push({
								variant_code : item_list[i].variant_code,
								variant_de : item_list[i].variant_de,
								});
							}
						
							}
							variantcode.dataSource.data(filtered_varcode);
							variantcode.select(0);
							if(item_code_data.value() == "ALL")
							{
								variantcode.text("ALL");
								variantcode.enable(false);
							}
                        }
						
                        }
	 
	 });
	 item_code_data = $("#item_code").data("kendoComboBox");
	 item_code_data.list.width(300);
	$("#item_code").focus();
 	  $("#var_code").kendoComboBox({
		index:0,
		//enable: false,
		//filter: "contains",
		dataTextField: "variant_code",
		dataValueField: "variant_code",
		dataSource:filtered_varcode,
		template:'${ data.variant_code }'+'-'+'${ data.variant_de }',
		change: function(){
				value_changed_ind = true;	
			}
	});
	    variantcode = $("#var_code").data("kendoComboBox");
		variantcode.list.width(300);
	if(item_code_data.value() == "ALL")
	{
		variantcode.text("ALL");
		variantcode.enable(false);
	}
		item_type = [{i_desc:"ALL",i_type:"ALL"}];
		function onChange2() 
			{
				dsplit2=list_of_item_type.text().split("-");
				list_of_item_type.text(dsplit2[0]);
                $('#item_type_desc').val(dsplit2[1]);
			}
		executeService_retrieve_listof_item_types();
		list_of_item_type=$('#item_type').kendoDropDownList({
			dataTextField:"i_desc",
			dataValueField:"i_type",
			dataSource:item_type,
			change:onChange2
		}).data("kendoDropDownList");

		$('#retrieve').click(function() {

		stock_enquiry_details =executeService_retrieve_stock_enquiry();
		if (stock_enquiry_details == '1')
		{
			return 1;
		}
		
		xml=loadXMLString(stock_enquiry_details);
		dSource = new kendo.data.DataSource({
							data: xml,
                        schema: {
                            type: "xml",
                            data: "list/inventory_record",
                            model: {
                                fields: {
									item_type:"item_type/text()",
									item_code:"item_code/text()",
									item_variant_code:"item_variant_code/text()",
                                    warehouse_id:"warehouse_id/text()",
                                    lot_batch_no:"lot_batch_no/text()",
									stock_on_hand:"stock_on_hand/text()",
									uom_code:"uom_code/text()",
									uom_desc:"uom_desc/text()",
									expiry_date:"expiry_date/text()",
									last_txn_no:"last_txn_no/text()",
									last_txn_type:"last_txn_type/text()",
									last_txn_date:"last_txn_date/text()",
									last_txn_hour:"last_txn_hour/text()",
									last_txn_minute:"last_txn_minute/text()"
                                }
							}
                        },
						 pageSize: 8
                        });


						dSource.read();
						item_details=dSource.data();
						if (item_details.length>0)
						{
						//$('#qty').text(stock_details.total_quantity);
						//$('#uom1').text("("+stock_details.primary_uom_desc+")");
						}
						else
						{
							alert("Stock details are not available for the selected Item.");
						}
						stock_inquiry.dataSource.data(item_details);
		/*var batch_no=0;
		for(i=0;i<item_details.length;i++)
		{
		if(item_details[i].lot_batch_no =="NA")
		{
		batch_no=1;
		console.log("Batch No:"+batch_no);
		}
		else
		{
		batch_no=0;
		console.log("Batch No:"+batch_no);
		}
		}
		if (batch_no==1)
		 {
		 	$('#grid td:nth-child(2)').hide();
			$('#grid th:nth-child(2)').hide();
			$('#grid td:nth-child(4)').hide();
			$('#grid th:nth-child(4)').hide();
		 }
		*/
		});
		item_details =new kendo.data.ObservableArray([]);
                       var dSource = new kendo.data.DataSource({
						data: item_details,
						pageSize: 8,
						schema: {
                           model: {
                             fields: {
								item_type:{ editable: false},
								item_code:{ editable: false},
								item_variant_code:{ editable: false},
                                warehouse_id:{ editable: false},
                                lot_batch_no:  { editable: false},
								stock_on_hand: { editable: false},
								uom_code: { editable: false},
								uom_desc : { editable: false},
								expiry_date:{ editable: false},
								last_txn_no : { editable: false},
								last_txn_type :{ editable: false},
								last_txn_date :{ editable: false},
								last_txn_hour :{ editable: false},
								last_txn_minute :{ editable: false}
                             }
                           }
                       }

                        });
		grid=$("#grid").kendoGrid({
                        dataSource: dSource,
                        pageable: true,
                        height: 340,
						//sortable: true,
						reorderable: true,
                        resizable: true,
						//selectable: true,
						filterable: false,
                        columns: [
							{ field:"item_type", title: "Item Type", width: "93px" ,template: '#if (kendo.toString(item_type) == "") {#   # } else { # ${item_type} #}#'},
							{ field:"item_code", title: "Item Code", width: "93px" ,template: '#if (kendo.toString(item_code) == "") {#   # } else { # ${item_code} #}#'},
							{ field:"item_variant_code", title: "Item variant code", width: "93px" ,template: '#if (kendo.toString(item_variant_code) == "") {#   # } else { # ${item_variant_code} #}#'},
                            { field:"warehouse_id", title: "Warehouse", width: "93px" ,template: '#if (kendo.toString(warehouse_id) == "") {#   # } else { # ${warehouse_id} #}#'},
                            { field:"lot_batch_no", title: "Lot / Batch No", width: "105px",template: '#if (kendo.toString(lot_batch_no) == "") {#   # } else { # ${lot_batch_no} #}#'},
                            { field:"stock_on_hand", title:"Stock on Hand",  width: "116px" ,template:'#if (kendo.toString(stock_on_hand) == "") {#  #} else {# ${stock_on_hand+"("+uom_desc+")"}#}#'},
                            { field:"expiry_date", title:"Expiry Date",  width: "94px" ,template: '#if (kendo.toString(expiry_date) == "") {#  #} else {# ${expiry_date} #}#'},
                            { field:"last_txn_no", title:"Last Transaction No",  width: "153px" ,template: '#if (kendo.toString(last_txn_no) == "") {#  #} else {# ${last_txn_no} #}#'},
                            { field:"last_txn_type", title:"Last Transaction Type",  width: "150px" ,template: '#if (kendo.toString(last_txn_type) == "") {#  #} else {# ${last_txn_type} #}#'},
							{ field:"last_txn_date", title:"Last Transaction Date & Time",  width: "204px" ,template:'#if (kendo.toString(last_txn_date) == "") {#  #} else {# ${last_txn_date+" "+last_txn_hour+":"+last_txn_minute} #}#'}]
		});
		stock_inquiry = $("#grid").data("kendoGrid");
	}