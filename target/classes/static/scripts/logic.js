Ext.onReady(function () {
    Ext.define('TestApp.model.Zayavka', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'long'},
            {name: 'name', type: 'string'},
            {name: 'sender', type: 'string'},
            {name: 'receiver', type: 'string'},
            {name: 'status', type: 'string'}
        ]
    });

    Ext.define('TestApp.store.AllZayavkas', {
        extend: 'Ext.data.Store',
        storeId: 'allZayavkas',
        model: 'TestApp.model.Zayavka',
        fields: ['id', 'name', 'sender', 'receiver', 'status'],
        proxy: {
            type: 'ajax',
            url: '/getAll',
            reader: {
                type: 'json',
                root: 'zayavkas'
            }
        },
        autoLoad: true
    });

    /*Sender model and store*/
    Ext.define('TestApp.model.Sender', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'long'},
            {name: 'name', type: 'string'}
        ]
    });
    var senders = Ext.create('Ext.data.Store', {
        storeId: 'sendersList',
        fields: ['id', 'name'],
        proxy: {
            type: 'ajax',
            url: '/getSenders',
            reader: {
                type: 'json',
                root: 'senders'
            }
        },
        autoLoad: true
    });

    /*Receiver model and store*/
    Ext.define('TestApp.model.Receiver', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'long'},
            {name: 'name', type: 'string'}
        ]
    });
    var receivers = Ext.create('Ext.data.Store', {
        // storeId: 'sendersList',
        fields: ['id', 'name'],
        proxy: {
            type: 'ajax',
            url: '/getReceivers',
            reader: {
                type: 'json',
                root: 'receivers'
            }
        },
        autoLoad: true
    });

    /*Status model and store*/
    Ext.define('TestApp.model.Status', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'long'},
            {name: 'name', type: 'string'}
        ]
    });
    var statuses = Ext.create('Ext.data.Store', {
        // storeId: 'sendersList',
        fields: ['id', 'name'],
        proxy: {
            type: 'ajax',
            url: '/getStatuses',
            reader: {
                type: 'json',
                root: 'statuses'
            }
        },
        autoLoad: true
    });


    Ext.define('TestApp.view.ZayavkasList', {
        extend: 'Ext.grid.Panel',
        alias: 'widget.zayavkaslist',
        title: 'Текущие заявки в системе',
        store: 'AllZayavkas',
        initComponent: function () {
            this.tbar = [{
                text: 'Новая заявка',
                action: 'add',
                iconCls: 'zayavka-add'
            }];
            this.columns = [
                {header: 'Id', dataIndex: 'id', flex: 1},
                {header: 'Имя', dataIndex: 'name', flex: 3},
                {header: 'От кого', dataIndex: 'sender', flex: 2},
                {header: 'Кому', dataIndex: 'receiver', flex: 2},
                {header: 'Статус', dataIndex: 'status', flex: 2},
                {
                    header: 'Удаление', flex: 2,
                    renderer: function (v, m, r) {
                        var id = Ext.id();
                        Ext.defer(function () {
                            Ext.widget('image', {
                                renderTo: id,
                                name: 'delete',
                                src: '/images/delete.png',
                                align: 'center',
                                listeners: {
                                    afterrender: function (me) {
                                        me.getEl().on('click', function () {
                                            var grid = Ext.ComponentQuery.query('zayavkaslist')[0];
                                            if (grid) {
                                                var sm = grid.getSelectionModel();
                                                var rs = sm.getSelection();
                                                if (!rs.length) {
                                                    Ext.Msg.alert('Внимание', 'Заявка не выбрана');
                                                    return;
                                                }
                                                var promptBox = Ext.Msg;
                                                promptBox.buttonText = {
                                                    no: 'Отмена',
                                                    yes: 'Да'
                                                };
                                                promptBox.confirm('Удаление заявки',
                                                    'Вы уверены?',
                                                    function (button) {
                                                        if (button == 'yes') {
                                                            var zayavka = rs[0].getData();
                                                            Ext.Ajax.request({
                                                                url: 'delete',
                                                                method: 'POST',
                                                                jsonData: zayavka,
                                                                success: function (response) {
                                                                    var grid = Ext.ComponentQuery.query('zayavkaslist')[0];
                                                                    grid.getStore().load();
                                                                }
                                                            });
                                                        }
                                                    });
                                            }
                                        });
                                    }
                                }
                            });
                        }, 50);
                        return Ext.String.format('<div id="{0}"></div>', id);
                    }
                }
            ];
            this.callParent(arguments);
        }
    });

    Ext.define('TestApp.view.ZayavkasForm', {
        extend: 'Ext.window.Window',
        alias: 'widget.zayavkasform',
        title: 'Новая заявка',
        width: 350,
        layout: 'fit',
        resizable: false,
        closeAction: 'hide',
        modal: true,
        config: {
            recordIndex: 0,
            action: ''
        },
        items: [{
            xtype: 'form',
            layout: 'anchor',
            bodyStyle: {
                background: 'none',
                padding: '10px',
                border: '0'
            },
            defaults: {
                xtype: 'textfield',
                anchor: '100%'
            },
            items: [{
                xtype: 'hiddenfield',
                name: 'id',
                fieldLabel: 'id'
            },
                {
                    name: 'name',
                    fieldLabel: 'Имя'
                }, {
                    xtype: 'combobox',
                    name: 'sender',
                    fieldLabel: 'От кого',
                    forceSelection: true,
                    store: senders,
                    valueField: 'name',
                    displayField: 'name'
                }, {
                    xtype: 'combobox',
                    name: 'receiver',
                    fieldLabel: 'Кому',
                    forceSelection: true,
                    store: receivers,
                    valueField: 'name',
                    displayField: 'name'
                }, {
                    xtype: 'combobox',
                    name: 'status',
                    fieldLabel: 'Статус',
                    forceSelection: true,
                    store: statuses,
                    valueField: 'name',
                    displayField: 'name'
                }]
        }],
        buttons: [{
            text: 'OK',
            action: 'add'
        }, {
            text: 'Очистка',
            handler: function () {
                this.up('window').down('form').getForm().reset();
            }
        }, {
            text: 'Отмена',
            handler: function () {
                this.up('window').close();
            }
        }]
    });

    Ext.define('TestApp.controller.ZayavkasControll', {
        extend: 'Ext.app.Controller',
        stores: ['AllZayavkas'],
        views: ['ZayavkasList', 'ZayavkasForm'],
        refs: [{
            ref: 'formWindow',
            xtype: 'zayavkasform',
            selector: 'zayavkasform',
            autoCreate: true
        }],
        init: function () {
            this.control({
                'zayavkaslist > toolbar > button[action=add]': {
                    click: this.showAddForm
                },
                'zayavkaslist': {
                    itemdblclick: this.onRowdblclick
                },
                'zayavkasform button[action=add]': {
                    click: this.doAddZayavka
                }
            });
        },
        onRowdblclick: function (me, record, item, index) {
            var win = this.getFormWindow();
            win.setTitle('Редактирование заявки');
            win.setAction('edit');
            win.setRecordIndex(index);
            win.down('form').getForm().setValues(record.getData());

            win.show();
        },
        showAddForm: function () {
            var win = this.getFormWindow();
            win.setTitle('Новая заявка');
            win.setAction('add');
            win.down('form').getForm().reset();
            win.show();
        },
        doAddZayavka: function () {
            var win = this.getFormWindow();
            var store = this.getAllZayavkasStore();
            var values = win.down('form').getValues();

            var action = win.getAction();
            var url = '';
            url = 'save';
            Ext.Ajax.request({
                url: url,
                method: 'POST',
                jsonData: values,
                success: function (response) {
                    store.load();
                }
            });
            win.close();
        }
    });

    Ext.application({
            name: 'TestApp',
            controllers: ['ZayavkasControll'],
            launch: function () {
                Ext.widget('zayavkaslist', {
                    width: 500,
                    height: 300,
                    renderTo: 'output'
                });
            }
        }
    );
});