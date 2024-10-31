window.addEventListener('message', (m)=>{
    let data = {}
    if(typeof m.data=='string' && m.data.indexOf('!')!=0){
        data = JSON.parse(m.data);
    }else{
        data = {};
    }
    if(typeof data.id!=='undefined' && data.id!==''){
        if(wp.data){
            // if(wp.data.select( 'core/block-editor' ).getSelectedBlock()!==null){
            //     wp.data.select( 'core/block-editor' ).getSelectedBlock().attributes.title = data.id;
            //     console.log(wp.data.select( 'core/block-editor' ).getSelectedBlock().attributes.title, wp.data.select( 'core/block-editor' ).getSelectedBlock(), wp.data.select( 'core/block-editor' ))
            //     // wp.data.select( 'core/block-editor' ).getBlockIndex()
            // }
        }else{
            tinyMCE.editors[0].execCommand('mceInsertContent', false, '[native-forms id="'+data.id+'"]');
            jQuery('#TB_window, #TB_overlay').fadeOut();
        }
    }
})