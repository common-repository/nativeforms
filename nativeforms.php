<?php
    /**
     * Plugin Name: NativeForms
     * Author: NativeForms
     * Author URI: https://nativeforms.com/
     * Plugin URI: https://nativeforms.com/wordpress
     * Description: Build forms, surveys & polls for WordPress. Add forms to your website in few minutes and start getting more from your visitors.
     * Version: 1.0.2
     * Requires at least: 4.7
     * Requires PHP: 5.2.4
     * License: GPLv2 or later
     * License URI: https://www.gnu.org/licenses/gpl-2.0.html
     * Text Domain:: nativeforms
     */

    namespace Dodel\Nativeforms;

    final class Nativeforms{
        public function __construct(){
           add_action( 'admin_menu', [$this, 'plugin_menu'] );
           add_action('enqueue_block_editor_assets', [$this, 'load_block']);
           add_action('wp_enqueue_scripts', [$this, 'enqueue_scripts']);
           add_action('wp_footer', [$this, 'wp_footer']);
           add_action('admin_enqueue_scripts', [$this, 'enqueue_admin']);
           add_action( 'after_setup_theme', [$this,'theme_setup'] );
           add_action ('admin_footer', [$this, 'admin_footer']);
           add_shortcode( 'native-forms', [$this, 'create_nativeforms_shortcode'] );
        }

        // Shortcode: [native-forms id=""]
        public function create_nativeforms_shortcode($atts) {

            $atts = shortcode_atts(
                array(
                    'id' => '',
                ),
                $atts,
                'native-forms'
            );

            $id = $atts['id'];
            ob_start();
            ?>
                <iframe src="https://form.nativeforms.com/<?php echo esc_attr($id);?>" width="100%" height="600" frameborder="0" class="nf-resizable-form" > </iframe>
            <?php
            return ob_get_clean();
        }

        public function admin_footer(){
            ?>
            <div style="display:none">
                <div id="nativeforms-classic-content">
                    <iframe src="https://app.nativeforms.com/wordpress" frameborder="0" width=100% height=390></iframe>
                </div>
            </div>
                <style>
                    #TB_ajaxContent{
                        width: unset !important;
                    }
                </style>
            <?php
        }

        public function register_buttons( $buttons ) {
            array_push( $buttons, 'nativeformsbtn' );
            return $buttons;
        }

        public function add_buttons( $plugin_array ) {
            $plugin_array['nativeformsbtn'] = plugin_dir_url(__FILE__).'/classic.js';
            return $plugin_array;
        }

        public function toolbar_buttons(){
            add_filter( 'mce_external_plugins', [$this, 'add_buttons'] );
            add_filter( 'mce_buttons', [$this, 'register_buttons'] );
        }

        public function theme_setup(){
            add_action( 'init', [$this, 'toolbar_buttons'] );
        }

        public function wp_footer(){
            ?>
                <style>
                    .wp-block-dodel-nativeforms-block div.block-of-form{
                        display: none;
                    }
                    .wp-block-dodel-nativeforms-block div{
                        padding: 0 !important;
                        background-color: transparent !important;
                        border: 0 !important;
                        text-align: unset !important;
                    }
                </style>
            <?php
        }

        public function enqueue_admin(){
            wp_enqueue_script( 'nativeforms-plugin-script', plugin_dir_url(__FILE__).'/admin.js');
            wp_enqueue_script( 'nativeforms-script', 'https://script.nativeforms.com/main.js');
        }

        public function enqueue_scripts(){
            wp_enqueue_script( 'nativeforms-script', 'https://script.nativeforms.com/main.js');
        }

        public function plugin_menu() {
            add_menu_page( 'NativeForms', 'NativeForms', 'manage_options', 'native-forms', [$this, 'plugin_options'], 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAvVBMVEUiAP8uDv8yE/88Hv9VPP9dRP9hSP9jS/9mTf9oUP9oUf9rVP9uWf9zXf90X/96Zv+Abf+Cb/+Ecf+Hdf+KeP+Lef+Mev+OfP+Pf/+Qf/+Tgv+XiP+YiP+aiv+bi/+cjf+gkv+om/+toP+uof+vo/+5rv+6r/+6sP/Du//Hv//PyP/Vzv/Y0v/f2//h3f/i3f/j3//m4v/r6P/s6v/x7//y8f/18//29P/39v/49//5+P/7+//9/P/9/f////8DSW7hAAAAq0lEQVR42oSNA5rDABSEZ23UbmPbfPe/1Rpx/s9DmPdo8GxjjiYf0iiXW0Gd1KXbiIIgUOv7pJ4DgVDVJiRsHaDY/iksNykO8HfmK13+SI8ehYEIqMGLkuKH8yDZAJvJh0wi/mCyyYZWH1r1e4IN8WCL14qWWU90nCCYVLSTe4cJaG9wqDClG+1KT2K2pu3l7AJlfoYKCyzfxwQyBn9wCWMKSTCosaGLcdsCAOO4ENmdll4oAAAAAElFTkSuQmCC' );
        }
        
        public function plugin_options() {
            if ( !current_user_can( 'manage_options' ) )  {
                wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
            }
            ?>
                <div class="wrap">
                <div style="font-size: 18px; font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serifl">
				<div>
					<img style="width: 240px; margin-left: -12px;" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAycHQiIGhlaWdodD0iMjMyIiB2aWV3Qm94PSIwIDAgNjAyIDE3NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmIj48cGF0aCBkPSJNOTcuNyA1NC44YzcuNS0zLjkgMTYuMy00IDI0LjUtMyAxLjUuMiAxLjYgMi4xIDEuNyAzLjIuMyA4LjguNCAxOC40LTUgMjYtNCA2LTEwLjIgOS44LTE1LjMgMTQuNy0zLjIgMi44LjIgNi45IDAgMTAuMy0uMyA0LjUtMi44IDguNi01LjYgMTItMS40IDEuOS00LjMgMS01LjItLjgtMy4zLTUuMS02LjgtMTAuMi05LTE1LjkgMS41LS44IDMuNS0zLjUgNS4zLTEuNSAyLjcgMyA0LjIgNyA2LjUgMTAuMyAzLjItMi4yIDEuNC02LjUgMS05LjYtMS40LTQuNyAyLjItOC43IDUuNi0xMS4zIDQuNS00LjUgMTAuNC03LjggMTMuMi0xMy44YTQyIDQyIDAgMCAwIDIuNi0xNy43Yy02LS4zLTEyLjQtLjYtMTcuOSAyLjQtNy40IDQtMTIgMTEuMi0xNy44IDE3LjEtMi44IDMuMS03LjMgMS41LTEwLjggMS0yLjQtLjgtNC44LjQtNy4yIDEgMy44IDIuNCA3LjggNC41IDExLjQgNy4zLjMgMS40IDAgMyAwIDQuNC00LjMuNi03LjUtMi43LTExLTQuNi0zLjMtMi4yLTcuNC0zLjYtOS4xLTcuNCAzLTIuMSA2LTQuMyA5LjEtNiA0LjItMi4yIDguNy40IDEzIC4yIDYuNy02IDExLjYtMTQuNCAyMC0xOC4zWiIvPjxwYXRoIGQ9Ik05OS41IDY2LjRjMS42LS41IDMuNC0uNCA1LjEtLjVsLjkgMy44YzEuMy4zIDIuNi41IDMuOSAxIDIuMyA1LjgtNS4zIDExLjYtMTAuNCA4LjQtNC41LTIuNy00LjMtMTAuNC41LTEyLjdtMy42IDQuOWMtMS4zIDAtMiAyLjQtLjQgMi41IDEuMiAwIDItMi41LjQtMi41Wk04Ni41IDg0LjVjMS44LTIuNSA2LjktMi42IDYuNiAxLjQtMi4zIDMuMy01LjYgNS45LTguMyA4LjktMi45IDIuNy01LjIgNi4xLTguOCA4bC0zLjUtMi42YzMuNS02LjIgOS40LTEwLjQgMTQtMTUuN1pNNjMuNCA5NGMyLjYtMS45IDYgMi43IDMuNSA0LjctMi4zIDIuMy00LjIgNS4xLTcgNi44LTItLjItMy41LTEuNi00LTMuNSAyLTMuMiA0LjgtNS42IDcuNS04Wk02Ni41IDEwNS4zYzIuMy0xLjYgNS4yIDIuMiAzLjMgNC4zLTIuNyAzLjQtNiA2LjMtOS4zIDkuMS0yLjIgMS42LTUuOS0xLjgtMy42LTMuOCAzLTMuMyA2LjEtNi42IDkuNi05LjZaTTc3LjUgMTA4LjFjMi0xLjcgMy43IDEgNC45IDIuNS0yLjUgMi45LTQuOCA2LTcuOCA4LjMtMiAuOC0zLjYtLjktNS0yIDIuMy0zLjMgNC44LTYuNCA3LjktOC44WiIvPjwvZz48ZyBmaWxsPSIjMjEwMGZmIj48cGF0aCBkPSJNNDcuMyAzMy4yYzIuOC0uNyA1LjgtLjQgOC43LS41aDcyYzUuNC4xIDExIDIuOCAxMy4zIDcuOCAxLjYgNCAxLjIgOC4zIDEuMiAxMi41djcwYy4yIDQuNC0xLjUgOC45LTQuNyAxMS44LTIuOCAyLjEtNi4yIDMuMi05LjcgMy4ySDUzYy00IDAtOC4yLTEtMTEuNC0zLjUtMi44LTMtNC03LjQtNC0xMS41VjQ3YTE0IDE0IDAgMCAxIDkuOC0xMy44bTUwLjQgMjEuNWMtOC40IDQtMTMuMyAxMi40LTIwIDE4LjQtNC4zLjItOC44LTIuMy0xMy0uMy0zLjIgMS44LTYuMSA0LTkuMSA2IDEuNyA0IDUuOCA1LjMgOSA3LjUgMy42IDIgNi45IDUuMiAxMS4yIDQuNiAwLTEuNS4yLTMtLjEtNC40LTMuNi0yLjgtNy42LTQuOS0xMS40LTcuMyAyLjQtLjYgNC44LTEuOCA3LjMtMSAzLjQuNSA4IDIuMSAxMC43LTFDODggNzEuMyA5Mi43IDY0IDEwMCA2MC4xYzUuNS0zIDEyLTIuNyAxOC0yLjRhNDIgNDIgMCAwIDEtMi43IDE3LjdjLTIuOCA2LTguNyA5LjMtMTMuMyAxMy44LTMuMyAyLjYtNyA2LjYtNS42IDExLjMuNSAzIDIuMyA3LjQtLjkgOS42LTIuMy0zLjMtMy44LTcuMy02LjUtMTAuMy0xLjgtMi0zLjguNy01LjQgMS41IDIuMyA1LjcgNS44IDEwLjggOS4xIDE1LjkgMSAxLjkgMy44IDIuNyA1LjIuOCAyLjgtMy40IDUuMy03LjUgNS43LTEyIDAtMy40LTMuMy03LjUgMC0xMC4zIDUtNSAxMS4zLTguOCAxNS4zLTE0LjcgNS4zLTcuNiA1LjItMTcuMiA1LTI2LS4yLTEuMS0uMy0zLTEuOC0zLjItOC4yLTEtMTctLjktMjQuNSAzbTEuOCAxMS42Yy00LjggMi4zLTUgMTAtLjUgMTIuNyA1LjEgMy4yIDEyLjctMi42IDEwLjQtOC40LTEuMy0uNS0yLjYtLjctMy45LTFsLS45LTMuOGMtMS43LjEtMy41IDAtNS4xLjVtLTEzIDE4LjFjLTQuNiA1LjMtMTAuNSA5LjUtMTQgMTUuNyAxLjEuOSAyLjMgMS44IDMuNSAyLjUgMy42LTEuOCA2LTUuMiA4LjgtOCAyLjctMyA2LTUuNSA4LjMtOC44LjMtNC00LjgtNC02LjYtMS40bS0yMyA5LjVhMzMuNiAzMy42IDAgMCAwLTcuNSA4Yy40IDEuOSAxLjkgMy4zIDMuOSAzLjUgMi45LTEuNyA0LjctNC41IDctNi44IDIuNS0yLTEtNi42LTMuNS00LjdtMyAxMS4zYy0zLjQgMy02LjUgNi4zLTkuNiA5LjYtMi4yIDIgMS41IDUuNCAzLjcgMy44IDMuMy0yLjggNi42LTUuNyA5LjMtOS4xIDItMi4xLTEtNi0zLjMtNC4zbTExIDIuOGE0MC44IDQwLjggMCAwIDAtOCA4LjdjMS41IDEuMyAzIDIuOSA1IDIgMy4xLTIuMyA1LjUtNS4zIDcuOS04LjItMS4yLTEuNC0yLjktNC4yLTUtMi41Wk0yODkuMyA2Mi40aDEwdjguOGgtMTB2LTguOFpNMTc4LjggNjRoNy4yYzcuNCA5LjQgMTQuNiAxOC44IDIyLjEgMjggLjItOS4zIDAtMTguNiAwLTI4aDkuMXY0NEgyMTBjLTcuNC05LjQtMTQuNy0xOC44LTIyLjItMjguMVYxMDhoLTlWNjRaTTM3NS41IDY0aDI5Ljl2Ny42aC0yMC4ydjEwLjdINDA0djcuNWgtMTguN1YxMDhoLTkuN1Y2NFpNMjY3LjMgNjguNmw5LjQtMi4zdjEwaDh2Ny4xaC04Yy4xIDUtLjYgMTAuMy40IDE1LjMgMS4yIDMgNS4xIDIgNy43IDIuNWwtLjIgNi45Yy01LjcgMS4xLTEzLjYuNi0xNi4xLTUuNi0yLjEtNi4xLTEtMTIuOC0xLjMtMTlsLTYtLjF2LTdoNnYtNy44WiIvPjxwYXRoIGQ9Ik0xMDMgNzEuM2MxLjcgMCAuOSAyLjUtLjMgMi41LTEuNy0uMS0xLTIuNS40LTIuNVpNMjI1LjcgODMuN2MyLjMtNS44IDkuMS05IDE1LjEtNy42IDMgLjUgNS4zIDIuNiA3LjUgNC41bC41LTQuMmg5Yy0uOSAxMC41LS4zIDIxLS41IDMxLjZoLTkuNGMwLTEuMyAwLTIuNi4yLTQtNC42IDUtMTIuOCA2LjMtMTguMiAyLTYuNS01LjItNy0xNS00LjItMjIuM20xMS45IDBjLTMuMSAxLjQtNCA1LjEtNCA4LjMgMCAzIC42IDYuNSAzLjIgOC4zIDMuNCAyLjQgOC45IDEgMTAuMy0zIDEuMi0zLjYgMS4zLTcuNy0uNC0xMS0xLjYtMy4zLTYtNC4yLTkuMS0yLjZaTTI4OS42IDc2LjRoOS40VjEwOGgtOS40Vjc2LjRaTTMwMi40IDc2LjRoMTBjMi42IDYuOCA1LjIgMTMuNSA4IDIwLjNsOC4yLTIwLjNoOS4zTDMyNC4xIDEwOGgtOGwtMTMuNy0zMS42Wk0zNDcuNCA3Ny40YzUuOC0yLjcgMTMuOC0yLjIgMTggMy4yIDMgMy43IDMuMiA4LjcgMy40IDEzLjJoLTIxLjJjLjggMi41IDEuNSA1LjQgNCA2LjYgNC42IDIuMyAxMCAuNyAxNC4yLTEuNGwyLjYgNi4yYy03IDQuMy0xNi43IDQuOS0yMy42IDAtOC45LTYuNy03LjctMjMgMi42LTI3LjhNMzUxIDgzYy0yIDEuMy0yLjUgMy45LTMuNCA2aDEzLjNjLS40LTEuNS0uOC0zLTEuNS00LjUtMS43LTIuOC01LjgtMy4yLTguNC0xLjVaTTQxOS40IDc2LjVjNy0xLjkgMTUuOC0uMSAxOS42IDYuNSA0LjIgNy40IDMgMTguNi00LjggMjMuMmExOS4yIDE5LjIgMCAwIDEtMTkuMS0uM2MtMTAuNS02LjgtOC41LTI2LjQgNC4zLTI5LjRtMyA2LjhjLTUuMyAyLjItNS4yIDkuNC0zLjcgMTQgMS41IDQuNyA4LjUgNS42IDExLjQgMS43IDIuMi0zLjUgMi4xLTguMi44LTEyLTEuMS0zLjQtNS4zLTQuOS04LjUtMy43Wk00NDcgNzYuNGg5bC40IDUuNGMxLjUtMiAyLjgtNC4yIDUuMi01LjIgMi4zLTEgNS0uNyA3LjUtLjhWODRjLTMuMS0uMi02LjYtMS05LjMuOS0yLjMgMS41LTMgNC41LTMgN3YxNmwtOS41LjFjLS4xLTEwLjUuMy0yMS4xLS40LTMxLjZaTTQ3Mi43IDc2LjNsOSAuMS4zIDQuNWMyLjgtMy4yIDYuNi01LjYgMTEtNSAzLjYtLjEgNi4zIDIuNSA4LjMgNS4zIDIuOC0zLjQgNy4xLTYgMTEuNy01LjMgNC41LjEgOC41IDMuNyA5IDguMi45IDggLjIgMTYgLjQgMjMuOUg1MTNjLS4zLTcuMy41LTE0LjUtLjQtMjEuOC0uNS0zLjUtNS4xLTMuOS03LjUtMi0yLjEgMS41LTIuNiA0LjMtMi42IDYuOC0uMiA1LjcgMCAxMS4zIDAgMTdINDkzYy0uMi03LjMuNS0xNC42LS40LTIxLjgtLjUtMy40LTUtMy45LTcuNC0yLTIuMSAxLjUtMi42IDQuMy0yLjYgNi43LS4yIDUuNyAwIDExLjQgMCAxNy4xSDQ3M2MtLjEtMTAuNS40LTIxLjEtLjQtMzEuN1pNNTMzLjIgNzguMmM2LjYtMy45IDE1LjEtMi44IDIxLjUuOWwtMi41IDYuMmMtNC4xLTIuMi05LjQtNC42LTEzLjktMi0xLjUgMS4yLTEgMy4xIDAgNC40IDQuOCAyLjIgMTAuOCAxLjMgMTUgNSAzLjggNCAyLjIgMTEuMy0yLjcgMTMuOC03IDMuNy0xNiAyLjQtMjIuOC0xLjJsMi41LTYuNGM0LjQgMiA5LjQgNC4yIDE0LjMgMi44IDItLjMgMi0yLjcgMi44LTQuMi01LTIuNy0xMS4yLTEuNy0xNS43LTUuMi00LjUtMy42LTMuMy0xMS4zIDEuNS0xNC4xWiIvPjwvZz48L3N2Zz4="></img>
				</div>	
				<h3>How to use?</h3>
					<p>
						1. Go to
						<a
							href="https://app.nativeforms.com/"
							rel="noopener noreferrer"
							target="_blank"
						>
							https://app.nativeforms.com/
						</a>
						and login to your account.
					</p>
					<p>2. Create your form.</p>
					<p>3. Go back to WordPress and open you pages Editor.</p>
					<p>4. Add "NativeForms" block and select your form.</p>
					<p>5. That's it. Form is added to your website!</p>
				</div>
                <script>
                    window.addEventListener('load', ()=>{
                        document.querySelector('#wp-iframe').style.height = (document.querySelector('#wpwrap').offsetHeight - document.querySelector('#wpfooter').offsetHeight - document.querySelector('#wpbody-content .wrap').offsetTop - 65) + 'px'
                    })
                </script>
            <?php
        }

        public function load_block(){
            wp_enqueue_script(
                'nativeforms-block',
                plugin_dir_url(__FILE__) . 'nativeforms-block.js',
                array('wp-blocks','wp-editor'),
                true
              );
        }
    }

    new Nativeforms;