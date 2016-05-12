require 'compass/import-once/activate'
Encoding.default_external = Encoding.find('utf-8')
# require 'compass-normalize'
# Require any additional compass plugins here.
# 
# enable sourcemaps  安装gem install compass-sourcemaps --pre
enable_sourcemaps = true
sass_options = {:sourcemap => true}

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "/app/styles"
sass_dir = "/app/sass"
images_dir = "/app/images"
javascripts_dir = "/app/scripts"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :nested

#压缩比例
# output_style = (environment == :development) ? :expanded : :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false
line_comments = false

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
# sass_options = {:debug_info => true}

